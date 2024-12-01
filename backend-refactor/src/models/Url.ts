import { CreateUrl } from "../types/UrlTypes";
import databaseClient from "../utils/DatabaseClient";
import { nanoid } from "nanoid";

interface createResult {
    url: string;
    success?: boolean;
    id?: string;
    error?: string;
}

class Url {
    
    async createShortUrl(input: CreateUrl): Promise<createResult> {
        const regex = /^[a-zA-Z0-9]+$/;
        let { userId, longUrl, shortUrl, description } = input;

        if (shortUrl && !regex.test(shortUrl)) {
            throw new Error("Invalid short URL");
        }

        if (!shortUrl) {
            do {
                shortUrl = nanoid(6);
            } while (await alreadyExists(shortUrl));
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

                // Implementar luego cuando se haga el stats class y tags class
                /*
                await this.addUrlToUrlStats(urlId, client);
                if (tags && tags.length > 0) {
                    for (const tag of tags) {
                        try {
                            await this.addTagToUrl(urlId, tag.id, client);
                        } catch (error) {
                            console.error(`Error al añadir tag ${tag.id} a la URL ${urlId}:`, error);
                        }
                    }
                }
                */

                return urlId;
            });

            result.id = newUrl;
            result.success = true;
            return result;
        } catch (error) {
            console.error("Error creando short URL:", error);
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

export default Url;