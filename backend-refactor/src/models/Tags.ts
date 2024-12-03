import { PoolClient } from "pg";
import databaseClient from "../utils/DatabaseClient";

interface createResult {
    success: boolean;
    tagId: number;
}

interface create{
    name: string;
    description: string;    
    userId: string;
}

interface params {
    userId: string;
    tagId: string;
}

interface addToUrl{
    tagId: string;
    urlId: string;
    client: PoolClient;
}

interface update extends create, params{}

class Tags {
    
    async create(params: create): Promise<createResult> {
        const { name, description, userId } = params;

        try {
            const result = await databaseClient.execute("INSERT INTO tags (name, description, user_id) VALUES ($1, $2, $3) returning id", [name, description, userId]);

            if (result.rowCount === 0) {
                throw new Error("Failed to add tag");
            }
        
            return { success: true, tagId: result.rows[0].id };
        } catch (error) {
            console.error("Error al crear la etiqueta:", error);
            throw error;
        }
    }
    async get(params: params): Promise<any> {
        const { userId, tagId } = params;
        try {
            const { rows } = await databaseClient.execute("SELECT id, name, description FROM tags WHERE user_id = $1 AND id = $2", [userId, tagId]);
        
            if (rows.length === 0) {
                throw new Error("Tag not found");
            }
        
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAll(userId: string): Promise<any> {
        try {
            const { rows } = await databaseClient.execute("SELECT id, name, description FROM tags WHERE user_id = $1", [userId]);
            
            if (rows.length === 0) {
                throw new Error("No tags found");
            }

            return rows; // Controller se encarga de devolverlas formateadas

        } catch (error) {
            throw error;
        }
    }

    async delete(params: params): Promise<object> {
        const { userId, tagId } = params;

        try {
            const { rows } = await databaseClient.execute("DELETE FROM tags WHERE user_id = $1 AND id = $2", [userId, tagId]);
           
            if (rows.length === 0) {
                throw new Error("Tag not found");
            }

            return { success: true };
        } catch (error) {
            throw error;
        }
    }

    async update(params: update): Promise<object> {
        const { name, description, userId, tagId } = params;
    
        try {
            await databaseClient.transaction(async (client): Promise<void> => {
                const result = await client.query(
                    "UPDATE tags SET name = $1, description = $2 WHERE user_id = $3 AND id = $4",
                    [name, description, userId, tagId]
                );

                if (result.rowCount === 0) {
                    throw new Error("Tag not found or no changes made");
                }
            });
    
            return { success: true };
        } catch (error) {
            console.error("Error updating tag:", error);
            throw new Error("Failed to update tag");
        }
    }


    // Add tag to URL
    async addToUrl(params: addToUrl): Promise<object> {
        const { urlId, tagId, client } = params;

        try {
            await client.query(
                "INSERT INTO url_tags (url_id, tag_id) VALUES ($1, $2)",
                [urlId, tagId]
            );

            return { success: true };
        } catch (error) {
            console.error("Error adding tag to URL:", error);
            throw new Error("Failed to add tag to URL");
        }
    }

      
}

const tag = new Tags();
export default tag;