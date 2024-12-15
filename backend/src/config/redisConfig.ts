import { createClient } from 'redis';
import dotenv from 'dotenv'

dotenv.config({ path: '../.env' });
const {
    REDIS_PASSWORD,
    REDIS_HOST
} = process.env;

const redisClient = createClient({
    password: REDIS_PASSWORD,
    socket: {
        host: REDIS_HOST,
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