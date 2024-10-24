import client from "../utils/turso.js"

export const getUserInfo = async (id) => {
    try {
        const { rows } = await client.execute({
            sql: "SELECT * FROM users WHERE provider_id = ?",
            args: [id],
        });
        
        if (rows.length > 0) {
            return rows[0];
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        throw error; 
    }
};

export const getAllUsers = async () => {
    try {
        const { rows } = await client.execute("SELECT * FROM users");
        if (rows.length != 0) {
            return rows;
        } else {
            throw new Error("Not users found");
        }
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (username, id, picture) => {
    if (!id) {
        throw new Error('User ID is required to update the user');
    }

    let query = "UPDATE users SET ";
    let args = [];
    let updates = [];

    if (username) {
        updates.push("username = ?");
        args.push(username);
    }

    if (picture) {
        updates.push("picture = ?");
        args.push(picture);
    }

    if (updates.length === 0) {
        throw new Error('No fields to update');
    }

    query += updates.join(", ");
    query += " WHERE user_id = ?";
    args.push(id);
    const transaction = await client.transaction("write");
    try {
        // Ejecutar la consulta con los argumentos dinámicos
        const response = await transaction.execute({
            sql: query,
            args: args,
        });

        if (response.affectedRows === 0) {
            throw new Error('User not found or no changes made');
        }

        await transaction.commit();
        return response;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};