import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { getUserUrls } from '../services/urlServices';
import { getAllTags } from '../services/tagServices';
import TagsSection from './Dashboard/TagsSection';
import SearchAndActionBar from './Dashboard/SearchAndActionBar';
import UrlCard from '../components/UrlCard';
import UrlCardSkeleton from '../components/UrlCardSkeleton';
export default function Dashboard() {
  const { auth, loading } = useAuth();
  const userId = auth.user ? auth.user.sub.split('|')[1] : null;

  const [urlItems, setUrlItems] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoadingTags, setIsLoadingTags] = useState(true);

  // Función para actualizar URLs localmente
  const updateUrlsLocally = async (newUrl, isEditing = false) => {
    if (newUrl.shortUrl) {
        setUrlItems(prevUrls => {
            const urls = Array.isArray(prevUrls) ? prevUrls : [];
            
            if (isEditing) {
                return urls.map(url => url.id === newUrl.id ? newUrl : url);
            }
            
            return [...urls, newUrl];
        });
    } else {
        // Si no hay newUrl.shortUrl, obtener todas las URLs del usuario
        setUrlItems(await getUserUrls(userId));
    }
};

  // Función para eliminar URLs localmente
  const deleteUrlLocally = (urlId) => {
    setUrlItems(prevUrls => prevUrls.filter(url => url.id !== urlId));
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!userId) return;

      try {
        setIsLoadingTags(true);
        const fetchedTags = await getAllTags(userId);
        setTags(fetchedTags.tags.length ? fetchedTags.tags : []);
      } catch (error) {
        console.error('Error al cargar datos iniciales:', error);
      } finally {
        setIsLoadingTags(false);
      }
    };

    fetchInitialData();
  }, [userId]);


  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[900px] mx-auto">
        <section className="py-8">
          <TagsSection tags={tags} setTags={setTags} isLoading={isLoadingTags} userId={userId} setUrlItems={setUrlItems}/>
          <SearchAndActionBar 
            tags={tags} 
            userId={userId} 
            updateUrlsLocally={updateUrlsLocally}
            setUrlItems={setUrlItems}
          />
          <div className="space-y-2">
          {isLoadingTags ? <UrlCardSkeleton /> :
            urlItems.length > 0 && urlItems.map((item) => (
              <UrlCard 
                key={item.shortUrl} 
                item={item} 
                userId={userId}
                tags={tags}
                updateUrlsLocally={updateUrlsLocally}
                deleteUrlLocally={deleteUrlLocally}
                tagLoading={isLoadingTags}
              />
            ))
          }
          </div>
        </section>
      </div>
    </div>
  );
}