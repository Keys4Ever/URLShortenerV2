import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ShortUrl = () => {
    const { shortUrl } = useParams();

    useEffect(() => {
        const fetchUrl = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/url/${shortUrl}`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data && data.original_url) {
                    window.location.href = data.original_url;
                } else {
                    console.error('La respuesta no contiene original_url.');
                }

            } catch (error) {
                console.error('Error fetching the URL:', error);
            }
        };

        fetchUrl();
    }, [shortUrl]);

    return null;
};

export default ShortUrl;
