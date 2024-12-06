import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { corsConfig } from './config/corsConfig';
import cors from 'cors';

dotenv.config();

const app = express();

//Middlewares

app.use(cors(corsConfig));

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.redirect('http://localhost:5173');
});

app.get('/callback', (req: Request, res: Response) => {
  res.redirect('http://localhost:5173/');
});


app.listen(3000, () => console.log('Server running on port 3000'));
