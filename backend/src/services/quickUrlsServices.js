import crypto from 'crypto';
import { createShortUrl } from './urlsServices.js';
import client from '../utils/turso.js';

const quickUser = '00000000000';
export const createQuickUrl = async(shortUrl, longUrl) => {
    const result = await createShortUrl(quickUser, longUrl, shortUrl);
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
        if (!response.ok){
            throw new Error('Error al crear la url rápida')
        } 
        await transaction.commit();

        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    } finally {
        await transaction.close();
    }

}

/**
 * Connect url to an acc -> check hash -> if hash is correct -> change user_id in urls table for the current user_id. -> delete from quick_urls 
 */

export const connectUrlToAcc = async (userId, secretKey) => {
    const transaction = client.transaction('write');

    try {
        // Buscar la URL asociada al secret_key en quick_urls
        const selectResult = await transaction.execute(
            'SELECT id, short_url FROM quick_urls WHERE secret_key = ?',
            [secretKey]
        );

        if (selectResult.rows.length == 0) {
            throw new Error('No existe la secret');
        }

        const urlId = selectResult.rows[0].id;

        // Actualizar el user_id en la tabla urls
        const updateResult = await transaction.execute(
            'UPDATE urls SET user_id = ? WHERE id = ?',
            [userId, urlId]
        );

        if (updateResult.affectedRows == 0) {
            throw new Error('No se pudo actualizar el user_id en la tabla urls.');
        }

        // Eliminar la entrada de quick_urls
        const deleteResult = await transaction.execute(
            'DELETE FROM quick_urls WHERE secret_key = ?',
            [secretKey]
        );

        if (deleteResult.affectedRows == 0) {
            throw new Error('No se pudo eliminar la entrada en quick_urls.');
        }

        await transaction.commit();

        return { success: true, message: 'URL vinculada con éxito.' };
    } catch (err) {
        await transaction.rollback();
        throw err;
    } finally {
        await transaction.close();
    }
};