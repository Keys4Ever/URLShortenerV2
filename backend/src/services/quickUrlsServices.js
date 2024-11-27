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
        console.log("Iniciando transacción...");
        console.log("Input recibido -> userId:", userId, ", secretKey:", secretKey);

        // Buscar la URL asociada al secret_key en quick_urls
        const selectResult = await transaction.execute({
            sql:'SELECT id, short_url FROM quick_urls WHERE secret_key = ?',
            args:[secretKey]
         });

        console.log("Resultado de SELECT en quick_urls:", selectResult);

        if (selectResult.rows.length == 0) {
            console.error("No existe la secret");
            throw new Error('No existe la secret');
        }

        const urlId = selectResult.rows[0].id;
        let newUrl = {
            shortUrl: selectResult.rows[0].short_url,
            urlId: urlId
        };

        console.log("Datos iniciales de newUrl:", newUrl);

        const getLongUrl = await transaction.execute({
            sql: 'SELECT original_url FROM urls WHERE short_url = ?',
            args: [newUrl.shortUrl]
        });

        console.log("Resultado de SELECT original_url en urls:", getLongUrl);

        newUrl = {
            ...newUrl,
            longUrl: getLongUrl.rows[0]?.original_url
        };

        console.log("Datos completos de newUrl después de SELECT original_url:", newUrl);

        // Actualizar el user_id en la tabla urls
        const updateResult = await transaction.execute({
            sql: 'UPDATE urls SET user_id = ? WHERE id = ?',
            args: [userId, urlId]
            });

        console.log("Resultado de UPDATE en urls:", updateResult);

        if (updateResult.affectedRows == 0) {
            console.error("No se pudo actualizar el user_id en la tabla urls.");
            throw new Error('No se pudo actualizar el user_id en la tabla urls.');
        }

        // Eliminar la entrada de quick_urls
        const deleteResult = await transaction.execute({    
            sql:'DELETE FROM quick_urls WHERE secret_key = ?',
            args:[secretKey]
        });

        console.log("Resultado de DELETE en quick_urls:", deleteResult);

        if (deleteResult.affectedRows == 0) {
            console.error("No se pudo eliminar la entrada en quick_urls.");
            throw new Error('No se pudo eliminar la entrada en quick_urls.');
        }

        await transaction.commit();
        console.log("Transacción completada con éxito. Resultado final:", newUrl);

        return { success: true, message: 'URL vinculada con éxito.', newUrl: newUrl };
    } catch (err) {
        console.error("Error durante la transacción:", err);
        await transaction.rollback();
        throw err;
    }
};
