import { useState, useEffect } from "react";
import { getUserUrls } from "../services/urlServices";

const useUserUrls = (userId, setUrlItems) => {
    const [originalUrls, setOriginalUrls] = useState([]);

    useEffect(() => {
        const fetchUserUrls = async () => {
            console.log("fetched");
            try {
                const urls = await getUserUrls(userId);
                setOriginalUrls(urls);
                setUrlItems(urls);
            } catch (error) {
                console.error("Error fetching user URLs:", error);
                setOriginalUrls([]);
                setUrlItems([]);
            }
        };

        if (userId) {
            fetchUserUrls();
        }
    }, [userId, setUrlItems]);

    return originalUrls;
};

export default useUserUrls;
