import { Request, Response } from "express";
import quick from "../models/Quick.js";


export class quickControllers{
    static async create(req: Request, res: Response){
        const { longUrl } = req.body;
        
        if(!longUrl){
            return res.status(400).json({ error: "No puedo acortar la URL si no me das una URL para acortar :v" });
        }
    
        try {
            const result = await quick.create(longUrl);
    
            if(!result.success){
                throw new Error('Error creating quick url');
            }
            
            return res.status(201).json(result);
        } catch (error) {
            console.error("Error creating quick url:", error);
            return res.status(500).json({ error: "Error creating quick url" });
        }
    }

    static async connect(req: Request, res: Response){
        const { userId, secretKey } = req.body;
        
        if(!userId){
            return res.status(400).json({ error: "User ID es necesario" });
        }
    
        if(!secretKey){
            return res.status(400).json({ error: "No puedo vincular la URL si no me das una secretKey para vincular :v" });
        }
    
        try {
            const result = await quick.connect(userId, secretKey);
            
            console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO')
            console.log(result);
            console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO')

            if(typeof result === 'object'){
                return res.status(200).json({ result });
            }
            
            return res.status(200).json({ message: result });
        } catch (error) {
            console.error("Error connecting quick url:", error);
            return res.status(500).json({ error: "Error connecting quick url" });
        }
    }  
}
