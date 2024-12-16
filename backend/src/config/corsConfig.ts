import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const allowedOrigins = [
  process.env.FRONTEND_URL || '',
  'https://keys.lat',
  'https://www.keys.lat',
];

// Tipo para la función de configuración de CORS
type CorsOriginCallback = (err: Error | null, allow?: boolean) => void;

export const corsConfig = {
  origin: (origin: string | undefined, callback: CorsOriginCallback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true,
};
