import dotenv from 'dotenv';
import { createClient } from "@libsql/client";

dotenv.config();

const client = createClient({
  url: process.env.ASD,
  authToken: process.env.TURSO_TOKEN,
});

export default client;