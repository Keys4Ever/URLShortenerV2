import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [urlItems, setUrlItems] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoadingTags, setIsLoadingTags] = useState(true);


  useEffect(() => {
    if(loading)return;

    if(!auth.authenticated){
      navigate('/');
    }
  },[loading, auth.authenticated])

  const updateUrlsLocally = async (newUrl, isEditing = false) => {
    if (newUrl.shortUrl) {
        setUrlItems(prevUrls => {
            const urls = Array.isArray(prevUrls) ? prevUrls : [];
            console.log(prevUrls)
            if (isEditing) {
                return urls.map(url => url.id === newUrl.id ? newUrl : url);
            }
            
            return [...urls, newUrl];
        });
    } else {
        setUrlItems(await getUserUrls(userId));
    }

    console.log(newUrl);
};

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