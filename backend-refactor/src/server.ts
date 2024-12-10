import express from 'express';
import {corsConfig} from './config/corsConfig.js';
import cors from 'cors';

const app = express();

app.use(cors(corsConfig));

app.use(express.json());

app.get('/', (_req, res) => { 
  res.redirect('http://localhost:5173');
});

app.get('/callback', (_req, res) => { 
  res.redirect('http://localhost:5173/');
});


app.listen(3000, () => console.log('Server running on port 3000'));
