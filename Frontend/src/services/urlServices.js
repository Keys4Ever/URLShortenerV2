// services/urlService.js

const API_BASE_URL = 'http://localhost:3000/';

// Servicio para crear una URL corta
export const createShortUrl = async (userId, longUrl) => {
    const response = await fetch(`${API_BASE_URL}api/url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, longUrl })
    });
    return await response.json();
};

// Servicio para obtener la URL original a partir de una short URL
export const getOriginalUrl = async (shortUrl) => {
    const response = await fetch(`${API_BASE_URL}api/url/${shortUrl}`, {
        method: 'GET',
    });
    return await response.json();
};

// Servicio para borrar una URL corta
export const deleteUrl = async (shortUrl) => {
    const response = await fetch(`${API_BASE_URL}api/url/${shortUrl}`, {
        method: 'DELETE',
    });
    return await response.json();
};

// Servicio para actualizar una URL
export const updateUrl = async (currentShortUrl, currentLongUrl, newShortUrl, newLongUrl) => {
    const response = await fetch(`${API_BASE_URL}api/url`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentShortUrl, currentLongUrl, newShortUrl, newLongUrl })
    });
    return await response.json();
};

// Servicio para obtener todas las URLs de un usuario
export const getUserUrls = async (userId) => {
    const response = await fetch(`${API_BASE_URL}api/url/user/${userId}`, {
        method: 'GET',
    });
    return await response.json();
};

// Servicio para obtener todos los detalles de una short URL
export const getAllFromUrl = async (shortUrl) => {
    const response = await fetch(`${API_BASE_URL}api/url/details/${shortUrl}`, {
        method: 'GET',
    });
    return await response.json();
};
