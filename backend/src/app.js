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

app.use("/api/users", userRoutes);
app.use('/api/tags')
app.use("/clicks", urlStatRoutes);
app.use("/auth", authRoutes);
app.use("/", urlRoutes);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});