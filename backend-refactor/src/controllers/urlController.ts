import { Request, Response } from "express";
import Url from "../models/Url";


const createShortUrlController = async (req: Request, res: Response) => {
    const url = new Url();
    const { userId, longUrl, tags, description, shortUrl } = req.body;
    
    if (!userId) {
        return res.status(400).json({ error: "User ID es necesario" });
    }

    if (!longUrl) {
        return res.status(400).json({ error: "No puedo acortar la URL si no me das una URL para acortar :v" });
    }


    try {
        const result = await url.createShortUrl({ userId, longUrl, shortUrl, tags, description });

        return res.status(201).json(result);
    } catch (error) {
        console.error("Error creating short URL:", error);
        if(error.message === "Invalid short URL"){
            return res.status(406).json({ error: "Invalid short URL" });
        }
        return res.status(500).json({ error: "Error creating short URL" });
    }
};


export { createShortUrlController };