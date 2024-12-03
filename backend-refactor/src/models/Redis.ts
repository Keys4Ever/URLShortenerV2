import redisClient from "../config/redisConfig.ts";
class Redis {
    async getOriginalUrl(shortUrl: string): Promise<string | null> {
        try {
            const response = await redisClient.get(shortUrl);
            if (!response) {
                return null;
            }

            return response;
        } catch (error) {
            throw error;
        }
    }
}

const redis = new Redis();
export default redis;