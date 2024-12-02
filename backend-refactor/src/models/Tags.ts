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
    async get(userId: string, tagId: string): Promise<any> {
        try {
            const { rows } = await databaseClient.execute("SELECT id AS id, name AS name, description AS description FROM tags WHERE user_id = $1 AND id = $2", [userId, tagId]);
        
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
            return rows;
        } catch (error) {
            throw error;
        }
    }

    
}