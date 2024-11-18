import express from "express";
import cors from "cors";
import { authMiddleware, checkUserInDatabase } from "./middlewares/auth0.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

import userRoutes from "./routes/userRoutes.js";
import urlRoutes from './routes/urlRoutes.js';
import urlStatRoutes from './routes/urlStatRoutes.js'
import authRoutes from './routes/authRoutes.js'
import tagsRoutes from './routes/tagsRoutes.js'
import quickUrlRoutes from './routes/quickUrlsRoutes.js'
import { getOriginalUrl } from "./services/urlsServices.js";
import { updateClicks } from "./services/urlStatServices.js";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS (All routes, change later)
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true
  };
  
  app.use(cors(corsOptions));
  

app.use(authMiddleware);

app.use(checkUserInDatabase);

app.use(express.json());

app.get("/", (req, res) => {
    res.redirect('http://localhost:5173');
});

app.get("/callback", (req, res) => {
    res.redirect('http://localhost:5173/');
})

app.get('/:shortUrl', async(req, res) => {
    try {
        const shortUrl = req.params.shortUrl;

        const originalUrl = await getOriginalUrl(shortUrl);
        
        if(originalUrl){
            await updateClicks(shortUrl);
        }

        return res.redirect(originalUrl.startsWith('https://') ? originalUrl : originalUrl.startsWith('http://') ? originalUrl : 'https://'+originalUrl );
    } catch (error) {
        console.error("Error en endpoint:", error);
        if (error.message === 'notfound') {
            return res.status(404).json({ error: 'URL not found' });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.use("/api/quick", quickUrlRoutes);
app.use("/api/users", userRoutes);
app.use('/api/tags',  tagsRoutes);
app.use("/clicks", urlStatRoutes);
app.use("/auth", authRoutes);
app.use("/api/url", urlRoutes);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});