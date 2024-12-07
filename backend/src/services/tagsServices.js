import client from "../utils/turso.js";

// Create Tag
export const createTag = async(name, description, userId) => {
    const transaction = await client.transaction('write');
    try {
        const result = await transaction.execute({
            sql: "INSERT INTO tags (name, description, user_id) VALUES (?, ?, ?)",
            args: [name, description, userId]
        });

        if (result.rowsAffected == 0) {
            throw new Error("Failed to add tag");
        }

        await transaction.commit();
        return { success: true, tagId: Number(result.lastInsertRowid) };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// Get a single Tag by ID
export const getTag = async (userId, tagId) => {
    try {
        const { rows } = await client.execute({
            sql: "SELECT id AS id, name AS name, description AS description FROM tags WHERE user_id = ? AND id = ?",
            args: [userId, tagId]
        });
        
        if (rows.length === 0) {
            throw new Error("Tag not found");
        }
        
        return rows[0];
    } catch (error) {
        throw error;
    }
};

// Get all Tags for a User
export const getAllTags = async (userId) => {
    console.log("Received userId: ", userId);
    try {
        const { rows } = await client.execute({
            sql: "SELECT id, name, description FROM tags WHERE user_id = ?",
            args: [userId] // Convertimos userId a un número entero
        });
        return rows;
    } catch (error) {
        throw error;
    }
};


// Update Tag
export const updateTag = async (userId, tagId, newName, newDescription) => {
    String(userId);
    const transaction = await client.transaction('write');
    try {
        const result = await transaction.execute({
            sql: "UPDATE tags SET name = ?, description = ? WHERE user_id = ? AND id = ?",
            args: [newName, newDescription, userId, tagId]
        });

        if (result.rowsAffected === 0) {
            throw new Error("Tag not found or no changes made");
        }

        await transaction.commit();
        return { success: true };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// Delete Tag
export const deleteTag = async (userId, tagId) => {
    const transaction = await client.transaction('write');
    try {
        const result = await transaction.execute({
            sql: "DELETE FROM tags WHERE user_id = ? AND id = ?",
            args: [userId, tagId]
        });

        if (result.rowsAffected === 0) {
            throw new Error("Tag not found");
        }

        await transaction.commit();
        return { success: true };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// addTagToUrl con transacción opcional
export const addTagToUrl = async (urlId, tagId, transaction) => {
    console.log("addTagToUrl llamada con urlId:", urlId, "y tagId:", tagId);

    try {
        console.log("Ejecutando consulta SQL...");
        const result = await transaction.execute({
            sql: "INSERT INTO url_tags (url_id, tag_id) VALUES (?, ?)",
            args: [urlId, tagId],
        });

        console.log("Consulta SQL ejecutada. Resultado:", result);

        if (result.rowsAffected === 0) {
            console.log("Ninguna fila afectada. Lanzando error.");
            throw new Error("No se pudo asociar la etiqueta con la URL.");
        }

        console.log("Etiqueta asociada con URL exitosamente.");
        return { success: true };

    } catch (error) {
        console.error("Error en addTagToUrl:", error);
        throw error;  // Re-lanza el error para ser manejado más arriba
    }
};
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       