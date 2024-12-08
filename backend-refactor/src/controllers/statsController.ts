import stats from "../models/Stats";
import { Request, Response } from "express";
import { isValidShortUrl } from "../utils/isValidShortUrl";

export class statsController {
    static async getStats(req: Request, res: Response) { 
        const { shortUrl, day } = req.params;
    
        if (!shortUrl) {
            res.status(400).json({ error: "Short URL no especificado" });
            return;
        }
        if(!day) {
            res.status(400).json({ error: "Fecha no especificada" });
            return;
        }
        const validDate = new Date(day);
        if (isNaN(validDate.getTime())) {
            res.status(400).json({ error: "Fecha inválida" });
            return;
        }
        try {
            const clicks = await stats.getOneDayClics(shortUrl, day);
            res.status(200).json({ clicks: clicks });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los clics" });
        }
    }
    static async updateStats(req: Request, res: Response) {
        const { shortUrl } = req.params;
        if (!shortUrl) {
            res.status(400).json({ error: "Short URL no especificado" });
            return;
        }
        if(!isValidShortUrl(shortUrl)) {
            res.status(400).json({ error: "Short URL inválido" });
            return;
        }
        try {
            await stats.updateClicks(shortUrl);
            res.status(200).json({ message: "Clicks actualizados" });
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar los clicks" });
        }
    }
}
