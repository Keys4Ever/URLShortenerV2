import { createClient } from 'redis';
import dotenv from 'dotenv'

dotenv.config({ path: '../.env' });
const {
    REDIS_URL,
} = process.env;

const redisClient = createClient({
    url: REDIS_URL,
});

redisClient.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
});

redisClient.connect()
    .then(() => console.log('Connected to Redis in the cloud'))
    .catch((err) => console.error('Redis connection failed:', err));

export default redisClient;