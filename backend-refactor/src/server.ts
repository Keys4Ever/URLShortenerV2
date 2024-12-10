import express from 'express';
import {corsConfig} from './config/corsConfig';
import cors from 'cors';

import quickRoutes from './routes/quickUrlRoutes';
import tagsRoutes from './routes/tagsRoutes';
import statsRoutes from './routes/urlStatRoutes';
import authRoutes from './routes/authRoutes';
import urlRoutes from './routes/urlRoutes';

const app = express();

app.use(cors(corsConfig));

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
