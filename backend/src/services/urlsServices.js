import { addTagToUrl } from "./tagsServices.js";
import client from "../utils/turso.js"
import {addUrlToUrlStats} from './urlStatServices.js'
import { nanoid } from 'nanoid'

export const createShortUrl = async (userId, longUrl, shortUrl, tags, description) => {
    console.log("Iniciando createShortUrl...");
    
    if (!userId) {
        console.error("Error: User ID es necesario");
        return { error: "User ID es necesario" };
    }
    if (!longUrl) {
        console.error("Error: No puedo acortar la URL si no me das una URL para acortar");
        return { error: "No puedo acortar la URL si no me das una URL para acortar :v" };
    }

    console.log("Generando shortUrl...");
    if (!shortUrl) {
        do {
            shortUrl = nanoid(6);
            console.log(`Generado shortUrl: ${shortUrl}`);
        } while (await alreadyExists(shortUrl));
    }

    const result = {
        url: shortUrl,
        success: false,
    };
    console.log("Iniciando transacción...");
    const transaction = await client.transaction("write");

    let query = "INSERT INTO urls (user_id, short_url, original_url";
    const params = [userId, shortUrl, longUrl];

    if (description) {
        query += ", description) VALUES (?, ?, ?, ?) RETURNING id";
        params.push(description);
        console.log("Descripción proporcionada, ajustando la consulta SQL.");
    } else {
        query += ") VALUES (?, ?, ?) RETURNING id";
    }

    console.log("Ejecutando consulta SQL:", query, "con parámetros:", params);

    try {
        const { rows } = await transaction.execute({
            sql: query,
            args: params,
        });
        console.log("Consulta ejecutada con éxito, filas devueltas:", rows);

        // Ahora llamamos a addUrlToUrlStats dentro de la misma transacción
        await addUrlToUrlStats(rows[0].id, transaction);
        console.log("URL añadida a estadísticas con ID:", rows[0].id);

        if (tags && tags.length > 0) {
            console.log("Añadiendo etiquetas...");
            await Promise.all(tags.map((tag) => addTagToUrl(rows[0].id, tag.id, transaction)));
            console.log("Etiquetas añadidas exitosamente.");
        }

        result.success = true;
        await transaction.commit();
        console.log("Transacción confirmada con éxito.");
        return result;

    } catch (error) {
        console.error("Error creando short URL:", error);
        await transaction.rollback();
        console.error("Transacción revertida debido a error.");
        throw error;
    }
};



export const getOriginalUrl = async(shortUrl) =>{
    try {
        if(!shortUrl){
            throw new Error("No url");
        }
        const query = {
            sql: "SELECT original_url FROM urls WHERE short_url = ?",
            args:[shortUrl]
        };
        const { rows } = await client.execute(query);

        if (rows.length === 0) {
            throw new Error("notfound");
        }

        const originalUrl = rows[0].original_url;
        console.log("URL encontrada:", originalUrl);
        return originalUrl;
    } catch (error) {
        console.error("Error completo:", error);
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

export async function alreadyExists(shortUrl) {
    console.log(`Verificando si ya existe la shortUrl: ${shortUrl}`);
    
    try {
        if (!shortUrl) {
            throw new Error("Falta la URL");
        }

        const { rows } = await client.execute({
            sql: "SELECT * FROM urls WHERE short_url = ?",
            args: [shortUrl]
        });

        console.log("Consulta ejecutada, filas devueltas:", rows);

        if (!rows || rows.length === 0) {
            console.log("La shortUrl no existe.");
            return false;
        } else {
            console.log("La shortUrl ya existe.");
            return true;
        }
    } catch (error) {
        console.error("Error en alreadyExists:", error);
        throw error;  // Re-lanza el error para que pueda ser manejado más arriba en la cadena de llamadas
    }
}
