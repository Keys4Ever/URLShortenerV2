import databaseClient from "../utils/DatabaseClient.js";
import url from "./Url.js";
import crypto from 'crypto';

interface createResult {
    url: string;
    secretKey: string;
    success: boolean;
}

interface connectResult {
    success: boolean;
    message: string;
    newUrl: {
        urlId: string;
        shortUrl: string;
        longUrl: string;
        date: string;
        clicks: number;
    };
}

class Quick {
    quickUser = '00000000000';
    async create(longUrl: string): Promise<createResult> { 
        
        const user = this.quickUser;
        const result = await url.createShortUrl({userId: user, longUrl});
        
        if(!result){
            throw new Error('Error creating quick url');
        }
        
        const secretKey = crypto.randomBytes(64).toString('hex');
        try {

            databaseClient.transaction(async (client) => {
                await client.query(
                    'INSERT INTO quick_urls (short_url, secret_key) VALUES ($1, $2)',
                    [result.url, secretKey]
                );
            });

            const returnResult: createResult = {
                url: result.url,
                secretKey,
                success: true
            }

            return returnResult;
        } catch (error) {
            console.error('Error al crear la url rápida:', error);
            throw error;
        }
    }


    async connect(userId: string, secretKey: string): Promise<connectResult | string> {
        try {
            const result = await databaseClient.transaction(async (client) => {
                const urlResult = await client.query(
                    `
                    SELECT 
                        qu.id AS quickUrlId, 
                        u.id AS urlId,
                        qu.short_url AS shortUrl, 
                        u.original_url AS longUrl,
                        u.created_at AS date,
                        (SELECT COUNT(*) FROM url_stats WHERE url_id = u.id) AS clicks 
                    FROM quick_urls qu
                    JOIN urls u ON qu.short_url = u.short_url
                    WHERE qu.secret_key = $1
                    `,
                    [secretKey]
                );
    
                if (urlResult.rowCount === 0) {
                    throw new Error('No existe la secret');
                }
    
                const urlData = urlResult.rows[0];
    
                const updateResult = await client.query(
                    'UPDATE urls SET user_id = $1 WHERE id = $2 RETURNING *',
                    [userId, urlData.urlid]
                );
    
                if (updateResult.rows.length === 0) {
                    throw new Error('No se pudo actualizar el user_id en la tabla urls.');
                }
    
                const deleteResult = await client.query(
                    'DELETE FROM quick_urls WHERE secret_key = $1',
                    [secretKey]
                );
    
                if (deleteResult.rowCount === 0) {
                    throw new Error('No se pudo eliminar la entrada en quick_urls.');
                }
    
                return {
                    success: true,
                    message: 'URL vinculada con éxito.',
                    newUrl: {
                        urlId: urlData.urlid,
                        shortUrl: urlData.shorturl,
                        longUrl: urlData.longurl,
                        date: urlData.date,
                        clicks: urlData.clicks,
                    },
                };
            });
    
            return result;
        } catch (error) {
            console.error('Error al vincular la URL:', error);
            throw error;
        }
    }
    
}


const quick = new Quick();
export default quick;