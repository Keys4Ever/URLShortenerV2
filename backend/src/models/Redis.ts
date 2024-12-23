import redisClient from "../config/redisConfig.js";
import stats from "./Stats.js";
class Redis {
    async getOriginalUrl(shortUrl: string): Promise<string | null> {
        try {
            const response = await redisClient.get(shortUrl);
            if (!response) {
                return null;
            }


            stats.updateClicks(shortUrl);

            return JSON.parse(response);
        } catch (error) {
            throw error;
        }
    }
}

const redis = new Redis();
export default redis;