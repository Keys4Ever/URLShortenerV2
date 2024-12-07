import redisClient from "../config/redisConfig";
import stats from "./Stats";
class Redis {
    async getOriginalUrl(shortUrl: string): Promise<string | null> {
        try {
            const response = await redisClient.get(shortUrl);
            if (!response) {
                return null;
            }

            stats.updateClicks(shortUrl);

            return response;
        } catch (error) {
            throw error;
        }
    }
}

const redis = new Redis();
export default redis;