
import dotenv from 'dotenv'
dotenv.config({path: '.env'});

import express from 'express';
import {corsConfig} from './src/config/corsConfig.js';
import cors from 'cors';
import quickRoutes from './src/routes/quickUrlRoutes.js';
import tagsRoutes from './src/routes/tagsRoutes.js';
import statsRoutes from './src/routes/urlStatRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import urlRoutes from './src/routes/urlRoutes.js';
import { authMiddleware, checkUserInDatabase } from './src/auth/auth0.js';
const app = express();



app.use(cors(corsConfig));

app.use(authMiddleware);

app.use(checkUserInDatabase);

app.use(express.json());


app.get('/', (_req, res) => { 
  res.redirect(String(process.env.FRONTEND_URL));
});

app.get('/callback', (_req, res) => { 
  res.redirect(String(process.env.FRONTEND_URL));
});

app.post('/callback', (_req, res) => {
    res.redirect(String(process.env.FRONTEND_URL));
});


app.use("/api/quick", quickRoutes);
app.use('/api/tags',  tagsRoutes);
app.use("/clicks", statsRoutes);
app.use("/auth", authRoutes);
app.use("/api/url", urlRoutes);


app.listen(3000, () => console.log('Server running on port 3000'));
