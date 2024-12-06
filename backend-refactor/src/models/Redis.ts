import redisClient from "../config/redisConfig.ts";
import stats from "./Stats.ts";
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