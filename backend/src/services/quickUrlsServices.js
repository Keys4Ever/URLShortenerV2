import crypto from 'crypto';
import { createShortUrl } from './urlsServices.js';
import client from '../utils/turso.js';

const quickUser = '00000000000';
export const createQuickUrl = async(longUrl) => {
    const result = await createShortUrl(quickUser, longUrl);

    if(!result.success){
        throw new Error('Esto no tiene que pasar xd.')
    }
    
    const secretKey = crypto.randomBytes(64).toString('hex');
    const transaction = await client.transaction('write');

    try {
        const response = await transaction.execute({
            sql:'INSERT INTO quick_urls (short_url, secret_key) VALUES (?, ?)',
            args:[result.url, secretKey]
        })

        if (!response.rowsAffected){
            throw new Error('Error al crear la url rápida')
        } 

        await transaction.commit();

        return {
            url: result.url,
            secretKey: secretKey,
            success: true
        }
    } catch (error) {
        await transaction.rollback();
        throw error;
    }

}

/**
 * Connect url to an acc -> check hash -> if hash is correct -> change user_id in urls table for the current user_id. -> delete from quick_urls 
 */
export const connectUrlToAcc = async (userId, secretKey) => {
    const transaction = await client.transaction("write");
    try {
        // Obtener la URL con toda la información en una sola consulta
        const urlResult = await transaction.execute({
            sql: `
                SELECT 
                    qu.id AS urlId, 
                    qu.short_url AS shortUrl, 
                    u.original_url AS longUrl,
                    u.created_at AS date,
                    (SELECT COUNT(*) FROM url_stats WHERE url_id = qu.id) AS clicks
                FROM quick_urls qu
                JOIN urls u ON qu.short_url = u.short_url
                WHERE qu.secret_key = ?
            `,
            args: [secretKey]
        });

        if (urlResult.rows.length === 0) {
            throw new Error('No existe la secret');
        }

        const urlData = urlResult.rows[0];

        const updateResult = await transaction.execute({
            sql: 'UPDATE urls SET user_id = ? WHERE id = ?',
            args: [userId, urlData.urlId]
        });

        if (updateResult.affectedRows === 0) {
            throw new Error('No se pudo actualizar el user_id en la tabla urls.');
        }

        const deleteResult = await transaction.execute({    
            sql: 'DELETE FROM quick_urls WHERE secret_key = ?',
            args: [secretKey]
        });

        if (deleteResult.affectedRows === 0) {
            throw new Error('No se pudo eliminar la entrada en quick_urls.');
        }

        await transaction.commit();

        return { 
            success: true, 
            message: 'URL vinculada con éxito.', 
            newUrl: {
                urlId: urlData.urlId,
                shortUrl: urlData.shortUrl,
                longUrl: urlData.longUrl,
                date: urlData.date,
                clicks: urlData.clicks
            }
        };
    } catch (err) {
        await transaction.rollback();
        throw err;
    }
};
