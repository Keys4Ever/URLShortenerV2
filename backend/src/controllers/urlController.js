import { createShortUrl, getOriginalUrl, deleteUrl, updateUrl, getUserUrls, getAllFromUrl, alreadyExists } from '../services/urlsServices.js';

// Controller para crear una short URL
const createShortUrlController = async (req, res) => {
    try {
        const { userId, longUrl } = req.body;
        const result = await createShortUrl(userId, longUrl);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        return res.status(201).json(result);
    } catch (error) {
        console.error("Error creating short URL:", error);
        return res.status(500).json({ error: "Error creating short URL" });
    }
};

// Controller para obtener la URL original a partir de la short URL
const getOriginalUrlController = async (req, res) => {
    try {
        const { shortUrl } = req.params;
        const originalUrl = await getOriginalUrl(shortUrl);

        return res.status(200).json({ originalUrl });
    } catch (error) {
        console.error("Error retrieving original URL:", error);
        if (error.message === "notfound") {
            return res.status(404).json({ error: "Short URL not found" });
        }
        return res.status(500).json({ error: "Error retrieving original URL" });
    }
};

// Controller para borrar una short URL
const deleteUrlController = async (req, res) => {
    try {
        const { shortUrl } = req.params;
        await deleteUrl(shortUrl);
        return res.status(200).json({ message: "URL deleted successfully" });
    } catch (error) {
        console.error("Error deleting URL:", error);
        return res.status(500).json({ error: "Error deleting URL" });
    }
};

// Controller para actualizar una URL
const updateUrlController = async (req, res) => {
    try {
        const { currentShortUrl, currentLongUrl, newShortUrl, newLongUrl } = req.body;
        const result = await updateUrl(currentShortUrl, currentLongUrl, newShortUrl, newLongUrl);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        return res.status(200).json({ message: "URL updated successfully" });
    } catch (error) {
        console.error("Error updating URL:", error);
        return res.status(500).json({ error: "Error updating URL" });
    }
};

// Controller para obtener todas las URLs de un usuario
const getUserUrlsController = async (req, res) => {
    try {
        const { userId } = req.params;
        const urls = await getUserUrls(userId);
        return res.status(200).json(urls);
    } catch (error) {
        console.error("Error retrieving user URLs:", error);
        return res.status(500).json({ error: "Error retrieving user URLs" });
    }
};

// Controller para obtener todos los detalles de una short URL
const getAllFromUrlController = async (req, res) => {
    try {
        const { shortUrl } = req.params;
        const urlDetails = await getAllFromUrl(shortUrl);
        return res.status(200).json(urlDetails);
    } catch (error) {
        console.error("Error retrieving URL details:", error);
        return res.status(500).json({ error: "Error retrieving URL details" });
    }
};

export {
    createShortUrlController,
    getOriginalUrlController,
    deleteUrlController,
    updateUrlController,
    getUserUrlsController,
    getAllFromUrlController
};
