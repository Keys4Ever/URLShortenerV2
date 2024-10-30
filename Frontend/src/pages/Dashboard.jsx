import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { getUserUrls } from '../services/urlServices';
import { getAllTags } from '../services/tagServices';
import TagsSection from './Dashboard/TagsSection';
import SearchAndActionBar from './Dashboard/SearchAndActionBar';

export default function Dashboard() {
    const { auth, loading } = useAuth();

    const userId = auth.user ? auth.user.sub.split('|')[1] : null;

    useEffect(() => {
        if (!loading && !auth.authenticated) {
            window.location.href = "http://localhost:3000/auth/login";
        }
    }, [loading, auth.authenticated]);

    // Mover urlItems y tags fuera de dashboardState
    const [urlItems, setUrlItems] = useState([]);
    const [tags, setTags] = useState([]);
    const [isLoadingTags, setIsLoadingTags] = useState(true);

    useEffect(() => {
        const fetchInitialData = async () => {
            if (!userId) return;

            try {
                setIsLoadingTags(true);
                const urls = await getUserUrls(userId);

                const fetchedTags = await getAllTags(userId);

                console.log("fetched tags: ",fetchedTags);
                setUrlItems(urls.length ? urls : []);
                setTags(fetchedTags.tags.length ? fetchedTags.tags : []);
                console.log("setted tags: ", tags);
            } catch (error) {
                console.error('Error al cargar datos iniciales:', error);
            } finally {
                setIsLoadingTags(false);
            }
        };

        fetchInitialData();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <div className='mx-16'>
                <main className='py-8'>
                    <TagsSection tags={tags} setTags={setTags} isLoading={isLoadingTags} userId={userId} />
                    <SearchAndActionBar /> 
                </main>
            </div>
        </div>
    );
}
