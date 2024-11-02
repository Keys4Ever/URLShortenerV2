import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { getUserUrls } from '../services/urlServices';
import { getAllTags } from '../services/tagServices';
import TagsSection from './Dashboard/TagsSection';
import SearchAndActionBar from './Dashboard/SearchAndActionBar';
import UrlCard from '../components/UrlCard';
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

                setUrlItems(urls.length ? urls : []);
                setTags(fetchedTags.tags.length ? fetchedTags.tags : []);
            } catch (error) {
                console.error('Error al cargar datos iniciales:', error);
            } finally {
                setIsLoadingTags(false);
                console.log(urlItems);
            }
        };

        fetchInitialData();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <div className='max-w-[900px] mx-auto'>
                <main className='py-8'>
                    <TagsSection tags={tags} setTags={setTags} isLoading={isLoadingTags} userId={userId} />
                    <SearchAndActionBar tags={tags} userId={userId} />
                    <div className="space-y-2">
                      {urlItems.map((item) => (
                            <UrlCard key={item.id} item={item} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
