// CRUD

import client from "../utils/turso"

// Create Tag
// Get tags
// Update tags ???
// Delete tags

// Add tag to url

export const createTag = async(name, description, userId) => {
    const transaction = await client.transaction('write');
    try {
        const result = await transaction.execute({
            sql: "INSERT INTO tags (name, description, userId) VALUES (?, ?, ?)",
            args: [name, description, userId]
        })

        if (result.rowsAffected == 0){
            throw new Error("Failed to add to tags");
        }

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

export const getTag = async(userId, tagId) => {
    try {
        // creo que esta no es la tabla en la que hay que trabajar pero bueno xd
        const result = await client.execute({
            sql: "SELECT id AS id, name AS name, description AS desc FROM tags WHERE user_id = ? AND id = ?",
            args: [userId, tagId]
        });        
    } catch (error) {
        
    }
}