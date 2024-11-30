import express from "express";
import cors from "cors";
import { authMiddleware, checkUserInDatabase } from "./middlewares/auth0.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

import userRoutes from "./routes/userRoutes.js";
import urlRoutes from './routes/urlRoutes.js';
import urlStatRoutes from './routes/urlStatRoutes.js';
import authRoutes from './routes/authRoutes.js';
import tagsRoutes from './routes/tagsRoutes.js';
import quickUrlRoutes from './routes/quickUrlsRoutes.js';
import { getOriginalUrl } from "./services/urlsServices.js";
import { updateClicks } from "./services/urlStatServices.js";
import responseTime from 'response-time';

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de CORS para localhost:5173
const restrictedCorsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
};

const globalCorsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
};

app.use(authMiddleware);
app.use(checkUserInDatabase);
app.use(express.json());
app.use(responseTime());

app.use("/auth", cors(globalCorsOptions), authRoutes);

app.get("/api/logout", cors(globalCorsOptions), (req, res) => {
    res.status(200).json({ message: "Logout successful" });
});
app.use("/api/quick", cors(restrictedCorsOptions), quickUrlRoutes);
app.use("/api/users", cors(restrictedCorsOptions), userRoutes);
app.use('/api/tags', cors(restrictedCorsOptions), tagsRoutes);
app.use("/clicks", cors(restrictedCorsOptions), urlStatRoutes);
app.use("/api/url", cors(restrictedCorsOptions), urlRoutes);


app.get("/", cors(globalCorsOptions), (req, res) => {
    res.redirect('http://localhost:5173');
});
app.get("/callback", cors(globalCorsOptions), (req, res) => {
    res.redirect('http://localhost:5173/');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});