import { createQuickUrl, connectUrlToAcc } from "../services/quickUrlsServices.js";
// Controller para crear una Quick URL
export const createQuickUrlController = async (req, res) => {
    try {
        const { longUrl } = req.body;

        if (!longUrl) {
            return res.status(400).json({ error: "longUrl es requerido" });
        }

        const result = await createQuickUrl(longUrl);

        if (result.success) {
            return res.status(201).json({ shortUrl: result.url, secretKey: result.secretKey, success: result.success });
        }

        return res.status(500).json({ error: "Error desconocido al crear la Quick URL" });
    } catch (error) {
        console.error("Error al crear Quick URL:", error);
        return res.status(500).json({ error: error.message || "Error al crear Quick URL" });
    }
};

// Controller para conectar una Quick URL a una cuenta
export const connectUrlToAccController = async (req, res) => {
    try {
        const { userId, secretKey } = req.body;

        if (!userId || !secretKey) {
            return res.status(400).json({ error: "userId y secretKey son requeridos" });
        }

        const result = await connectUrlToAcc(userId, secretKey);

        if (result.success) {
            return res.status(200).json({ message: result.message, newUrl: result.newUrl });
        }

        return res.status(500).json({ error: "Error desconocido al conectar la URL a la cuenta" });
    } catch (error) {
        console.error("Error al conectar URL a cuenta:", error);

        if (error.message === 'No existe la secret') {
            return res.status(404).json({ error: "Secret Key no encontrada" });
        }

        return res.status(500).json({ error: error.message || "Error al conectar URL a cuenta" });
    }
};
