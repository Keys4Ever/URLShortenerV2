import { BuildUpdateQueryParams, CreateUrl, currentUrl, HandleTagsParams, Tag, TagComparisonParams, UpdateParams, UpdateResponse, UpdateUrlInput } from "../types/UrlTypes";
import databaseClient from "../utils/DatabaseClient";
import { nanoid } from "nanoid";
import redisClient from "../config/redisConfig";
import stats from "./Stats";
import tag from "./Tags";
import { isValidShortUrl } from "../utils/isValidShortUrl";

interface createResult {
    url: string;
    id?: string;
    }


class Url {
    
    async createShortUrl(input: CreateUrl): Promise<createResult> {
        let { userId, longUrl, shortUrl, description, urlTags } = input;

        if (shortUrl && !isValidShortUrl(shortUrl)) {
            throw new Error("Invalid short URL format");
        }

        if (!shortUrl) {
            do {
                shortUrl = nanoid(6);
        } while (await alreadyExists(shortUrl) && !isValidShortUrl(shortUrl));
        }

        const result: createResult = {
            url: shortUrl,
        };



        // Esto se puede mejorar, pero es suficiente para el momento

        let query = `
        INSERT INTO urls (user_id, short_url, original_url
        `
        let params = [userId, shortUrl, longUrl];
        if (description) {
            query += `, description) VALUES ($1, $2, $3, $4) RETURNING id`;
            params.push(description);
        } else {
            query += `) VALUES ($1, $2, $3) RETURNING id`;
        }

        try {
            const newUrl = await databaseClient.transaction(async (client) => {

                const { rows } = await client.query(query, params);

                const urlId = rows[0].id;

                stats.initializeUrlStats({urlId, client});
                // Implementar luego cuando se haga el tags class
                
                if (urlTags && urlTags.length > 0) { 
                    for (const urlTag of urlTags) { 
                        try {
                            await tag.addToUrl({urlId, tagId: urlTag.id, client});
                        } catch (error) {
                            console.error(`Error al añadir tag ${urlTag.id} a la URL ${urlId}:`, error);
                        }
                    }
                }
                

                return urlId;
            });

            result.id = newUrl;
            return result;
        } catch (error) {
            console.error("Error creando short URL:", error);
            throw error;
        }
    }

    async getOriginalUrl(shortUrl: string): Promise<string>{


        if (!isValidShortUrl(shortUrl)) {
            throw new Error("Invalid short URL format");
        } 

        const { rows } = await databaseClient.execute("SELECT original_url FROM urls WHERE short_url = $1", [shortUrl]);

        if (rows.length == 0) {
            throw new Error("notfound");
        }

        const originalUrl = rows[0].original_url;

        const urlInRedis = {
            original_url: originalUrl,
            short_url: shortUrl
        }
        
        // Guardar item en redis para cachearlo uwu
        await redisClient.set(shortUrl, JSON.stringify(urlInRedis));

        stats.updateClicks(shortUrl);

        return originalUrl;
    }
    async delete(shortUrl: string): Promise<void> {
        try {
            await databaseClient.transaction(async (client) => {
                const result = await client.query(
                    "DELETE FROM urls WHERE short_url = $1",
                    [shortUrl]
                );

                if (result.rowCount === 0) {
                    throw new Error("No short URL found to delete");
                }

                console.log("Short URL deleted successfully:", shortUrl);
            });
        } catch (error) {
            console.error("Error in delete method:", error);
            throw error;
        }
    }

    async getAllFromUrl(shortUrl: string): Promise<Url[]> {

        if (!isValidShortUrl(shortUrl)) {
            throw new Error("Invalid short URL format");
        }

        try {
            const { rows } = await databaseClient.execute(
                "SELECT * FROM urls WHERE short_url = $1",
                [shortUrl]
            );
            if(rows.length == 0){
                throw new Error("No hay urls con ese short url");
            }
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getUserUrls(userId: string): Promise<currentUrl[]> {
        try {
            const { rows } = await databaseClient.execute(
                `
                   SELECT u.id AS url_id, u.short_url, u.original_url, u.description AS url_description,
                          COALESCE(us.clicks, 0) AS clicks,
                          us.access_date,
                          t.id AS tag_id, t.name AS tag_name, t.description AS tag_description
                   FROM urls u
                   LEFT JOIN url_stats us ON u.id = us.url_id
                   LEFT JOIN url_tags ut ON u.id = ut.url_id
                   LEFT JOIN tags t ON ut.tag_id = t.id
                   WHERE u.user_id = $1
                   ORDER BY u.id
                `,
                [userId]
            );

            if (rows.length === 0) {
                throw new Error("No tiene urls");
            }
            // Agrupar las etiquetas por URL
            const urls: currentUrl[] = [];
            let currentUrl: currentUrl | null = null;

            rows.forEach((row: any) => {
                if (!currentUrl || currentUrl.id !== row.url_id) {
                    if (currentUrl) urls.push(currentUrl);

                    currentUrl = {
                        id: row.url_id,
                        shortUrl: row.short_url,
                        longUrl: row.original_url,
                        description: row.url_description,
                        clicks: row.clicks,
                        date: row.access_date,
                        tags: []
                    };
                }

                if (row.tag_id) {
                    currentUrl.tags.push({
                        id: row.tag_id,
                        name: row.tag_name,
                        description: row.tag_description
                    });
                }
            });

            if (currentUrl) urls.push(currentUrl);

            return urls;
        } catch (error) {
            throw error;
        }
    }

    public async updateUrl(input: UpdateUrlInput): Promise<UpdateResponse> {
        const { currentShortUrl, currentLongUrl, newShortUrl, newLongUrl, tags, currentTags } = input;
        
        const updateParams: UpdateParams = {
            currentLongUrl,
            newLongUrl,
            currentShortUrl,
            newShortUrl,
            tags: tags || [],
            currentTags: currentTags || [],
        };
    
        if (!hasChanges(updateParams)) {
            return { error: 'No changes detected' };
        }
    
        const buildParams: BuildUpdateQueryParams = {
            currentShortUrl,
            currentLongUrl,
            newShortUrl,
            newLongUrl,
        };
    
        const { query, args } = buildUpdateQuery(buildParams);
    
        try {
            const response = await databaseClient.transaction(async (client) => {
                if (query !== '') {
                    const res = await client.query<{ id: string }>(query, args);
                    if (res.rowCount === 0) {
                        throw new Error('No matching URL found or no changes made');
                    }
                }
    
                const tagParams: HandleTagsParams = {
                    client,
                    addedTags: getAddedTags({ tags, currentTags }),
                    removedTags: getRemovedTags({ currentTags, tags }),
                    url: newShortUrl || currentShortUrl,
                };
    
                await handleTags(tagParams);
    
                return { message: 'Update successful' };
            });
    
            return response;
        } catch (error) {
            throw error;
        }
    }

}


// Funciones auxiliares
async function alreadyExists(shortUrl: string): Promise<boolean> {
    console.log(`Verificando si ya existe la shortUrl: ${shortUrl}`);
    try {
        if (!shortUrl) {
            throw new Error("Falta la URL");
        }

        const { rows } = await databaseClient.execute("SELECT COUNT(*) FROM urls WHERE short_url = $1", [shortUrl]);

        console.log("Consulta ejecutada, filas devueltas:", rows);

        return rows.length > 0;

    } catch (error) {
        console.error("Error en alreadyExists:", error);
        throw error;
    }
}

function hasChanges(params: UpdateParams): boolean {
    const {
        currentLongUrl,
        newLongUrl,
        currentShortUrl,
        newShortUrl,
        tags = [],
        currentTags = [],
    } = params;

    if (
        currentLongUrl !== (newLongUrl ?? currentLongUrl) ||
        currentShortUrl !== (newShortUrl ?? currentShortUrl)
    ) {
        return true;
    }

    const addedTags = getAddedTags({ tags, currentTags });
    const removedTags = getRemovedTags({ currentTags, tags });

    return addedTags.length > 0 || removedTags.length > 0;
}

function getAddedTags(params: TagComparisonParams): Tag[] {
    const { tags = [], currentTags = [] } = params;
    return tags.filter(tag => !currentTags.some(currentTag => currentTag.id === tag.id));
}

function getRemovedTags(params: TagComparisonParams): Tag[] {
    const { currentTags = [], tags = [] } = params;
    return currentTags.filter(currentTag => !tags.some(tag => tag.id === currentTag.id));
}

function buildUpdateQuery(params: BuildUpdateQueryParams): { query: string; args: any[] } {
    const { currentShortUrl, currentLongUrl, newShortUrl, newLongUrl } = params;

    let query = 'UPDATE urls SET ';
    const updates: string[] = [];
    const args: any[] = [];

    if (newShortUrl !== undefined && currentShortUrl !== newShortUrl) {
        updates.push(`short_url = $${args.length + 1}`);
        args.push(newShortUrl);
    }
    if (newLongUrl !== undefined && currentLongUrl !== newLongUrl) {
        updates.push(`original_url = $${args.length + 1}`);
        args.push(newLongUrl);
    }

    if (updates.length > 0) {
        query += updates.join(', ') + ' WHERE ';
    } else {
        return { query: '', args: [] };
    }

    const conditions: string[] = [];
    if (currentShortUrl) {
        conditions.push(`short_url = $${args.length + 1}`);
        args.push(currentShortUrl);
    }
    if (currentLongUrl) {
        conditions.push(`original_url = $${args.length + 1}`);
        args.push(currentLongUrl);
    }

    query += conditions.join(' AND ');

    return { query, args };
}

async function handleTags(params: HandleTagsParams): Promise<void> {
    const { client, addedTags, removedTags, url } = params;

    const urlIdQuery = 'SELECT id FROM urls WHERE short_url = $1';
    const urlIdRes = await client.query<{ id: string }>(urlIdQuery, [url]);
    if (urlIdRes.rows.length === 0) {
        throw new Error('URL not found');
    }
    const urlId = urlIdRes.rows[0].id;

    for (const tag of addedTags) {
        await client.query(
            'INSERT INTO url_tags (url_id, tag_id) VALUES ($1, $2)',
            [urlId, tag.id]
        );
    }

    for (const tag of removedTags) {
        await client.query(
            'DELETE FROM url_tags WHERE url_id = $1 AND tag_id = $2',
            [urlId, tag.id]
        );
    }
}
const url = new Url();

export default url;