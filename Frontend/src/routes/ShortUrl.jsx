import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BACKEND_URL = 'http://localhost:3000';

const ShortUrl = () => {
    const { shortUrl } = useParams();

    useEffect(() => {
        window.location.href = `${BACKEND_URL}/${shortUrl}`;
    }, []);

    return null;
};

export default ShortUrl;
