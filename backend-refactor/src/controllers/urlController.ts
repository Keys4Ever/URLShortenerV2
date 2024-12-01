import { Request, Response } from "express";
import Url from "../models/Url";
import Redis from "../models/Redis";

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

const getOriginalUrlController = async (req: Request, res: Response) => {
    const { shortUrl } = req.params;
    const url = new Url();
    const redis = new Redis();

    let originalUrl: string | null;

    if(!shortUrl){
        return res.status(400).json({ error: "Short URL is required" });
    }

    originalUrl= await redis.getOriginalUrl(shortUrl);

    if(!originalUrl){
        originalUrl = await url.getOriginalUrl(shortUrl);
    }
    console.log(originalUrl)
    return res.status(200).json({ originalUrl });
};

const deleteUrlController = async (req: Request, res: Response) => {
    const { shortUrl } = req.params;
    const url = new Url();
    
        if(!shortUrl){
            return res.status(400).json({ error: "Short URL is required" });
        }

    await url.delete(shortUrl);
    return res.status(200).json({ message: "URL deleted successfully" });
};

export { createShortUrlController, getOriginalUrlController, deleteUrlController };