export const createShortUrl = async (userId, longUrl, shortUrl, tags, description) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/url/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, longUrl, shortUrl, tags, description })
    });
    return await response.json();
};

export const getOriginalUrl = async (shortUrl) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/url/${shortUrl}`, {
        method: 'GET',
    });
    return await response.json();
};

export const deleteUrl = async (shortUrl, userId) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/url/${shortUrl}/${userId}`, {
        method: 'DELETE',
    });
    return await response.json();
};

export const updateUrl = async (currentShortUrl, currentLongUrl, newShortUrl, newLongUrl, tags, currentTags, description, currentDescription) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/url`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentShortUrl, currentLongUrl, newShortUrl, newLongUrl, tags, currentTags, description, currentDescription })
    });
    
    return await response.json();
};

export const getUserUrls = async (userId) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/url/user/${userId}`, {
        method: 'GET',
    });
    return await response.json();
};
export const getAllFromUrl = async (shortUrl, userId) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/url/details/${shortUrl}/${userId}`, {
        method: 'GET',
    });
    return await response.json();
};
