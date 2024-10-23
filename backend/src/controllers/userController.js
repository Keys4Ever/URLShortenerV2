import { getUserInfo, getAllUsers, updateUser, deleteUser, createUser } from '../services/userServices.js';

// Controller para obtener la información de un usuario por su ID
const getUserInfoController = async (req, res) => {
    try {
        const { id } = req.params; // El ID del usuario se espera en los parámetros de la URL
        const user = await getUserInfo(id);
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error obteniendo información del usuario:", error);
        return res.status(500).json({ error: "Error obteniendo información del usuario" });
    }
};

// Controller para obtener la lista de todos los usuarios
const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error obteniendo usuarios:", error);
        return res.status(500).json({ error: "Error obteniendo usuarios" });
    }
};

// Controller para actualizar un usuario
const updateUserController = async (req, res) => {
    try {
        const { username, picture } = req.body; // Nuevos datos que se enviarán en el cuerpo de la petición
        const { id } = req.params; // El ID del usuario se espera en los parámetros de la URL
        const updatedUser = await updateUser(username, id, picture);
        return res.status(200).json({ message: "Usuario actualizado correctamente", updatedUser });
    } catch (error) {
        console.error("Error actualizando usuario:", error);
        return res.status(500).json({ error: "Error actualizando usuario" });
    }
};

// Controller para eliminar un usuario por su ID
const deleteUserController = async (req, res) => {
    try {
        const { id } = req.params; // El ID del usuario se espera en los parámetros de la URL
        await deleteUser(id);
        return res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        console.error("Error eliminando usuario:", error);
        return res.status(500).json({ error: "Error eliminando usuario" });
    }
};

// Controller para crear un nuevo usuario
const createUserController = async (req, res) => {
    try {
        const { userId, email } = req.body; // Datos necesarios para crear el usuario
        const newUser = await createUser(userId, email);
        return res.status(201).json({ message: "Usuario creado correctamente", newUser });
    } catch (error) {
        console.error("Error creando usuario:", error);
        return res.status(500).json({ error: "Error creando usuario" });
    }
};

export {
    getUserInfoController,
    getAllUsersController,
    updateUserController,
    deleteUserController,
    createUserController
};
