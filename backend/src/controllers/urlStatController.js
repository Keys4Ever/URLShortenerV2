import { addUrlToUrlStats, updateClicks, getOneDayClics } from '../services/urlStatServices.js';

// Controller para actualizar los clics de una short URL
const updateClicksController = async (req, res) => {
    try {
        const { shortUrl } = req.params;
        await updateClicks(shortUrl);
        return res.status(200).json({ message: "Clicks actualizados correctamente" });
    } catch (error) {
        console.error("Error actualizando clics:", error);
        return res.status(500).json({ error: "Error actualizando clics" });
    }
};

// Controller para obtener los clics de un día específico
const getOneDayClicksController = async (req, res) => {
    try {
        const { shortUrl, day } = req.params;
        const clicks = await getOneDayClics(shortUrl, day);
        return res.status(200).json({ clicks });
    } catch (error) {
        console.error("Error obteniendo clics del día:", error);
        return res.status(500).json({ error: "Error obteniendo clics del día" });
    }
};

// Controller para añadir una URL a las estadísticas
const addUrlToUrlStatsController = async (req, res) => {
    try {
        const { id } = req.params;
        await addUrlToUrlStats(id);
        return res.status(201).json({ message: "URL añadida a las estadísticas correctamente" });
    } catch (error) {
        console.error("Error añadiendo la URL a las estadísticas:", error);
        return res.status(500).json({ error: "Error añadiendo la URL a las estadísticas" });
    }
};

export { updateClicksController, getOneDayClicksController, addUrlToUrlStatsController };
