const API_BASE_URL = 'http://localhost:3000/';

// Crear un nuevo tag
export const createTag = async (name, description, userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}api/tags`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description, userId })
        });

        if (!response.ok) {
            throw new Error('Error al crear el tag');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Obtener un tag específico por ID
export const getTag = async (tagId) => {
    try {
        const response = await fetch(`${API_BASE_URL}api/tags/${tagId}`);
        
        if (!response.ok) {
            throw new Error('Error al obtener el tag');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Obtener todos los tags de un usuario
export const getAllTags = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}api/tags/?userId=${userId}`);
        
        if (!response.ok) {
            throw new Error('Error al obtener los tags');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Actualizar un tag por ID
export const updateTag = async (tagId, newName, newDescription) => {
    try {
        const response = await fetch(`${API_BASE_URL}api/tags/${tagId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName, description: newDescription })
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el tag');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Eliminar un tag por ID
export const deleteTag = async (userId, tagId) => {
    try {
        const response = await fetch(`${API_BASE_URL}api/tags/${userId}/${tagId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el tag');
        }

        return { success: true };
    } catch (error) {
        console.error(error);
        throw error;
    }
};


// Asociar un tag a una URL
export const addTagToUrl = async (urlId, tagId) => {
    try {
        const response = await fetch(`${API_BASE_URL}api/url-tags`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ urlId, tagId })
        });

        if (!response.ok) {
            throw new Error('Error al asociar el tag con la URL');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
