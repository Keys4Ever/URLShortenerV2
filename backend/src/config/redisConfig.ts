import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });


const redisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: 18930
    }
});

redisClient.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
});

redisClient.connect()
    .then(() => console.log('Connected to Redis in the cloud'))
    .catch((err) => console.error('Redis connection failed:', err));

export default redisClient;