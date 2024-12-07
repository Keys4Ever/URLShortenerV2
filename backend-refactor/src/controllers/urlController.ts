import { Request, Response } from "express";
import url from "../models/Url";
import redis from "../models/Redis";


class urlController{
    async create(req: Request, res: Response){
        const { userId, longUrl, tags, description, shortUrl } = req.body;
        
        if (!userId) {
            return res.status(400).json({ error: "User ID es necesario" });
        }
    
        if (!longUrl) {
            return res.status(400).json({ error: "No puedo acortar la URL si no me das una URL para acortar :v" });
        }
    
    
        try {
            const result = await url.createShortUrl({ userId, longUrl, shortUrl, urlTags: tags, description });
    
            return res.status(201).json(result);
        } catch (error) {
            console.error("Error creating short URL:", error);
            return res.status(500).json({ error: "Error creating short URL" });
        }
    }

    async getOriginalUrl(req: Request, res: Response){
        const { shortUrl } = req.params;
    
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
    }
    
    async delete(req: Request, res: Response){
        const { shortUrl } = req.params;
        
            if(!shortUrl){
                return res.status(400).json({ error: "Short URL is required" });
            }
    
        await url.delete(shortUrl);
        return res.status(200).json({ message: "URL deleted successfully" });
    }
    
    async getAllFromUrl(req: Request, res: Response){
        const { shortUrl } = req.params;
        
        if(!shortUrl){
            return res.status(400).json({ error: "Short URL is required" });
        }
    
        try {
            const urls = await url.getAllFromUrl(shortUrl);
    
            if(urls.length == 0){
                return res.status(404).json({ error: "URL not found" });
            }
            return res.status(200).json(urls);
        } catch (error) {
            console.error("Error retrieving URL details:", error);
            return res.status(500).json({ error: "Error retrieving URL details" });
        }
      
    }
  
    async getUserUrls(req: Request, res: Response){
        const { userId } = req.params;
        
        if(!userId){
            return res.status(400).json({ error: "User ID is required" });
        }
    
        try {
            const urls = await url.getUserUrls(userId);
    
            if(urls.length == 0){
                return res.status(404).json({ error: "User doesn't have any URLs or the user doesn't exist" });
            }
            return res.status(200).json(urls);
        } catch (error) {
            console.error("Error retrieving user URLs:", error);
            return res.status(500).json({ error: "Error retrieving user URLs" });
        }
    }

    async updateUrl(req: Request, res: Response){
        const { currentShortUrl, currentLongUrl, newShortUrl, newLongUrl, tags, currentTags } = req.body;
    
        try {
            const result = await url.updateUrl({ currentShortUrl, currentLongUrl, newShortUrl, newLongUrl, tags, currentTags });
         
            if (result.error) {
                throw new Error("Error updating URL");
            }  
    
            return res.status(200).json({ message: "URL updated successfully" });    
        } catch (error) {
            console.error("Error updating URL:", error);
            return res.status(500).json({ error: "Error updating URL" });
        }
    }
}

const urlsController = new urlController();
export default urlsController;