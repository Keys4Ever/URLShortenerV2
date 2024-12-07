import { Request, Response } from "express";
import tag from "../models/Tags";


class tagController{
    async create(req: Request, res: Response){
        const { userId, name, description } = req.body;
    
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
    
        if (!name) {
            return res.status(400).json({ error: "Tag name is required" });
        }
    
        try {
            const result = await tag.create({name, description, userId});
    
            return res.status(201).json(result);
        } catch (error) {
            console.error("Error creating tag:", error);
            return res.status(500).json({ error: "Error creating tag" });
        }
    }
    
    async get(req: Request, res: Response){
        const { userId, tagId } = req.params;
        
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
    
        if (!tagId) {
            return res.status(400).json({ error: "Tag ID is required" });
        }
    
        try {
            const result = await tag.get({userId, tagId});
    
            if (!result) {
                return res.status(404).json({ error: "Tag not found" });
            }
            return res.status(200).json(result);
        } catch (error) {
            console.error("Error retrieving tag:", error);
            return res.status(500).json({ error: "Error retrieving tag" });
        }
    }
    
    async getAll(req: Request, res: Response){
        const { userId } = req.params;
        
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
    
        try {
            const tags = await tag.getAll(userId);
    
            if (tags.length === 0) {
                return res.status(404).json({ error: "No tags found" });
            }
            return res.status(200).json(tags);
        } catch (error) {
            console.error("Error retrieving tags:", error);
            return res.status(500).json({ error: "Error retrieving tags" });
        }
    }
    
    async update(req: Request, res: Response){
        const { userId, tagId } = req.params;
        const { name, description } = req.body;
    
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
    
        if (!tagId) {
            return res.status(400).json({ error: "Tag ID is required" });
        }
    
        if (!name && !description) {
            return res.status(400).json({ error: "Name or description is required" });
        }
    
        try {
            const result = await tag.update({userId, tagId, name, description});
    
            if (!result) {
                throw new Error("Error updating tag");
            }
    
            return res.status(200).json({ message: "Tag updated successfully" });
        } catch (error) {
            console.error("Error updating tag:", error);
            return res.status(500).json({ error: "Error updating tag" });
        }
    }
    
    async delete(req: Request, res: Response){
        const { userId, tagId } = req.params;
        
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
    
        if (!tagId) {
            return res.status(400).json({ error: "Tag ID is required" });
        }
    
        try {
            const result = await tag.delete({userId, tagId});
    
            if (!result) {
                throw new Error("Error deleting tag");
            }
    
            return res.status(200).json({ message: "Tag deleted successfully" });
        } catch (error) {
            console.error("Error deleting tag:", error);
            return res.status(500).json({ error: "Error deleting tag" });
        }
    } 
}

const tagsController = new tagController();
export default tagsController;