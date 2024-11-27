import redisClient from '../config/redisConfig.js'
export const getOriginalUrlFromRedis = async (shortUrl) => {

    try {
      const response = await redisClient.get(shortUrl);
      if (!response.original_url) {
        return null;
      }
      return response.original_url;
    } catch (error) {
      throw error;
    }
  };