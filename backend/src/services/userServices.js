import client from "../utils/turso"

const getUserInfo = async (id) => {
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

const getAllUsers = async () => {
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
const deleteUser = async (id) => {
    try {
        const response = await client.execute({
            sql: "DELETE FROM users WHERE user_id = ?",
            args: [id],
        });

        if (response.affectedRows === 0) {
            throw new Error('User not found or already deleted');
        }

        return response;
    } catch (e) {
        throw e; 
    }
};

const updateUser = async (username, id, picture) => {
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

    try {
        // Ejecutar la consulta con los argumentos dinámicos
        const response = await client.execute({
            sql: query,
            args: args,
        });

        if (response.affectedRows === 0) {
            throw new Error('User not found or no changes made');
        }

        return response;
    } catch (error) {
        throw error;
    }
};

const createUser = async (userId, email) =>{
    try {
        if(!userId){
            throw new Error("User ID Not found");
        }
        if(!email){
            throw new Error("Email not found");
        }
        
        const response = await client.execute({
            sql: "INSERT INTO users (userId, email) VALUES (?,?)",
            args: [userId, email]
        });
        
        if (response.affectedRows === 0){
            throw new Error("Error desconocido al crear el usuario");
        }
        return response;
    } catch (error) {
        throw error;
    }
}

export default {getUserInfo, getAllUsers, updateUser, deleteUser, createUser};