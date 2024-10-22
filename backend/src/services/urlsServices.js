import client from "../utils/turso"
import { nanoid } from 'nanoid'



const createShortUrl = async(userId, longUrl) =>{
    const shortUrl = nanoid(6);
    const result = {
        url: shortUrl,
        success: false
    }
    
    try {
        if(!userId){
            throw new Error("User id es necesario");
        }
        if(!longUrl){
            throw new Error("No puedo acortar la url si no me das una url para acortar :v");
        }
        const response = await client.execute({
            sql: "INSERT INTO urls (user_id, short_url, original_url) VALUES (?,?,?)",
            args: [userId, shortUrl, longUrl]
        });

        if(response.rowsAffected == 0){
            throw new Error("Error durante la inserción...")
        } 
        result.success = true;
        return result;
    } catch (error) {
        throw error;
    }
}

const getOriginalUrl = async(shortUrl) =>{
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

const deleteUrl = async(shortUrl) =>{
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

const updateUrl = async (currentShortUrl, currentLongUrl, newShortUrl, newLongUrl) => {
    let query = "UPDATE urls SET ";
    let args = [];
    let updates = [];

    try {
        // Validación: Si los valores actuales y los nuevos son iguales, no hay nada que actualizar
        if (currentLongUrl === newLongUrl && currentShortUrl === newShortUrl) {
            throw new Error("No changes detected");
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
            throw new Error("No fields to update");
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

        // Ejecutar la consulta con los argumentos generados
        const response = await client.execute({
            sql: query,
            args: args,
        });

        // Verificar si no se afectaron filas (no se encontró la URL)
        if (response.rowsAffected === 0) {
            throw new Error("No matching URL found or no changes made");
        }

        return response;
    } catch (error) {
        throw error;
    }
};

const getUserUrls = async (userId) => {
    try {
        if (!userId){
            throw new Error("Falta el user id");
        }
        const { rows } = await client.execute({
            sql: "SELECT * FROM urls WHERE user_id = ?",
            args: [userId]
        })
        if(rows.length == 0){
            throw new Error("No tiene urls")
        }
        return rows;
    } catch (error) {
        throw error;
    }
}

const getAllFromUrl = async (shortUrl) => {
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

export default {createShortUrl, getOriginalUrl, deleteUrl, updateUrl, getUserUrls, getAllFromUrl}