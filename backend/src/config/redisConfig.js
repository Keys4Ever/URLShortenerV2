import { createClient } from 'redis';

const redisClient = createClient({
    password: '8aPytXCIF7zRgh3AXniARSu9HdYzPI7B',
    socket: {
        host: 'redis-18930.c62.us-east-1-4.ec2.redns.redis-cloud.com',
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