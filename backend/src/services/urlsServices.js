import client from "../utils/turso.js"
import {addUrlToUrlStats} from './urlStatServices.js'
import { nanoid } from 'nanoid'

export const createShortUrl = async (userId, longUrl) => {
    let shortUrl = nanoid(6);

    while (alreadyExists(shortUrl)) {
        shortUrl = nanoid(6);
    }

    const result = {
        url: shortUrl,
        success: false
    };

    if (!userId) {
        return { error: "User ID es necesario" };
    }
    if (!longUrl) {
        return { error: "No puedo acortar la URL si no me das una URL para acortar :v" };
    }

    const transaction = await client.transaction("write");

    try {
        const response = await transaction.execute({
            sql: "INSERT INTO urls (user_id, short_url, original_url) VALUES (?, ?, ?) RETURNING id",
            args: [userId, shortUrl, longUrl]
        });

        try {
            addUrlToUrlStats(response.id);
        } catch (error) {
            throw new Error("Error al agregar la URL a las estadísticas: " + error.message);
        }

        await transaction.commit();
        result.success = true;

        return result;

    } catch (error) {
        await transaction.rollback();
        console.error("Error creando short URL:", error);
        throw error;
    }
};

export const getOriginalUrl = async(shortUrl) =>{
    try {
        if(!shortUrl){
            throw new Error("No url");
        }
        const { rows } = await client.execute({
            sql: "SELECT original_url FROM urls WHERE short_url = ?",
            args:[shortUrl]
        });
        if (rows.length == 0) {
            throw new Error("notfound");
        }
        return rows[0].original_url;
    } catch (error) {
        throw error;
    }
}

export const deleteUrl = async(shortUrl) =>{
    try {
        if(!shortUrl){
            throw new Error("No url");
        }
    
        const response = await client.execute({
            sql: "DELETE * FROM urls WHERE short_url = ?",
            args: [shortUrl]
        });
        if (response.rowsAffected == 0){
            throw new Error("No short url found")
        }
    } catch (error) {
        throw error;
    }
}

export const updateUrl = async (currentShortUrl, currentLongUrl, newShortUrl, newLongUrl) => {
    let query = "UPDATE urls SET ";
    let args = [];
    let updates = [];

    // Validación: Si los valores actuales y los nuevos son iguales, no hay nada que actualizar
    if (currentLongUrl === newLongUrl && currentShortUrl === newShortUrl) {
        return { error: "No changes detected" };
    }

    // Construir dinámicamente la parte de la query de actualización
    if (newShortUrl && currentShortUrl) {
        updates.push("short_url = ?");
        args.push(newShortUrl);
    }

    if (newLongUrl && currentLongUrl) {
        updates.push("original_url = ?");
        args.push(newLongUrl);
    }

    // Si no hay cambios a aplicar, lanzamos un error
    if (updates.length === 0) {
        return { error: "No fields to update" };
    }

    // Concatenar las actualizaciones dinámicas y añadir la condición WHERE
    query += updates.join(", ");
    query += " WHERE ";

    // Condiciones dinámicas en el WHERE
    let conditions = [];

    if (currentShortUrl) {
        conditions.push("short_url = ?");
        args.push(currentShortUrl);
    }

    if (currentLongUrl) {
        conditions.push("original_url = ?");
        args.push(currentLongUrl);
    }

    // Concatenar las condiciones del WHERE (puede ser una o ambas)
    query += conditions.join(" AND ");

    // Iniciar la transacción
    const transaction = await client.transaction("write");

    try {
        // Ejecutar la consulta con los argumentos generados
        const response = await transaction.execute({
            sql: query,
            args: args,
        });

        // Verificar si no se afectaron filas (no se encontró la URL)
        if (response.rowsAffected === 0) {
            throw new Error("No matching URL found or no changes made");
        }

        // Confirmar la transacción
        await transaction.commit();

        return response;

    } catch (error) {
        // Revertir la transacción en caso de error
        await transaction.rollback();
        throw error;
    }
};

export const getUserUrls = async (userId) => {
    try {
        if (!userId) {
            throw new Error("Falta el user id");
        }

        const { rows } = await client.execute({
            sql: `
                SELECT u.id AS url_id, u.short_url, u.original_url, 
                       t.id AS tag_id, t.name AS tag_name, t.description AS tag_description
                FROM urls u
                LEFT JOIN url_tags ut ON u.id = ut.url_id
                LEFT JOIN tags t ON ut.tag_id = t.id
                WHERE u.user_id = ?
                ORDER BY u.id
            `,
            args: [userId]
        });

        if (rows.length === 0) {
            throw new Error("No tiene urls");
        }

        // Agrupar las etiquetas por URL
        const urls = [];
        let currentUrl = null;

        rows.forEach(row => {
            if (!currentUrl || currentUrl.url_id !== row.url_id) {
                if (currentUrl) urls.push(currentUrl);

                currentUrl = {
                    id: row.url_id,
                    short_url: row.short_url,
                    original_url: row.original_url,
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

export const getAllFromUrl = async (shortUrl) => {
    try {
        if(!shortUrl){
            throw new Error("Falta la URL");
        }
        const { rows } = await client.execute({
            sql: "SELECT * FROM urls WHERE short_url = ?",
            args: [shortUrl]
        });
        if(rows.length == 0){
            throw new Error("No hay urls con ese short url");
        }
        return rows;
    } catch (error) {
        throw error;
    }
}

export async function alreadyExists(shortUrl){
    try {
        if(!shortUrl){
            throw new Error("Falta la URL");
        }

        const { rows } = client.execute({
            sql: "SELECT * FROM urls WHERE short_url = ?",
            args: [shortUrl]
        })
        
        if(rows.length == 0){
            return false;
        }else{
            return true;
        }
    } catch (error) {
        throw error;
    }
}