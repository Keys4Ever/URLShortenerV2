import dotenv from 'dotenv'

dotenv.config({ path: '../.env' });



export const corsConfig = {
  origin: process.env.FRONTEND_URL,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true,
};