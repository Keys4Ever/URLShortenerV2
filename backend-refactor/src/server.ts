import express from 'express';
import {corsConfig} from './config/corsConfig.js';
import cors from 'cors';
import quickRoutes from './routes/quickUrlRoutes.js';
import tagsRoutes from './routes/tagsRoutes.js';
import statsRoutes from './routes/urlStatRoutes.js';
import authRoutes from './routes/authRoutes.js';
import urlRoutes from './routes/urlRoutes.js';
import { authMiddleware, checkUserInDatabase } from './auth/auth0.js';

const app = express();

app.use(cors(corsConfig));

app.use(authMiddleware);

app.use(checkUserInDatabase);

app.use(express.json());


app.get('/', (_req, res) => { 
  res.redirect('http://localhost:5173');
});

app.get('/callback', (_req, res) => { 
  res.redirect('http://localhost:5173/');
});


app.use("/api/quick", quickRoutes);
app.use('/api/tags',  tagsRoutes);
app.use("/clicks", statsRoutes);
app.use("/auth", authRoutes);
app.use("/api/url", urlRoutes);


app.listen(3000, () => console.log('Server running on port 3000'));
