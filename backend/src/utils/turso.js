import dotenv from 'dotenv';
import { createClient } from "@libsql/client";

dotenv.config();
const client = createClient({
  url: process.env.TURSO_URL,
  authToken: process.env.TURSO_TOKEN,
});
export default client;