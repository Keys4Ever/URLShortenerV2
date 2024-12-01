import redisClient from "../config/redisConfig.ts";
class Redis {
    async getOriginalUrl(shortUrl: string): Promise<string | null> {
        try {
            const response = await redisClient.get(shortUrl);
            if (!response) {
                return null;
            }

            let parsedResponse: { original_url?: string } | null;
            try {
                parsedResponse = JSON.parse(response);
            } catch (error) {
                parsedResponse = null;
            }

            return parsedResponse?.original_url ?? null;
        } catch (error) {
            throw error;
        }
    }
}

export default Redis;