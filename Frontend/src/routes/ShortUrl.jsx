import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BACKEND_URL = 'http://localhost:3000';

const ShortUrl = () => {
    const { shortUrl } = useParams();

    useEffect(() => {
        const fetchUrl = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/url/${shortUrl}`, {
                    method: 'GET',
                });
                const data = await response.json();
                window.location.href = data.originalUrl;
            } catch (error) {
                console.error('Error fetching the URL:', error);
            }
        };

        fetchUrl();
    }, [shortUrl]); // Added shortUrl as a dependency

    return null;
};

export default ShortUrl;