import { LinkIcon, X } from "lucide-react";

import { createShortUrl, updateUrl } from "../../services/urlServices";
import { useState, useEffect } from "react";
import SkeletonTag from "./SkeletonTag.jsx";

const AddUrlModal = ({ tags, setShowUrlForm, userId, edit = false, item = null, updateUrlsLocally, tagLoading }) => {
  const [shortUrl, setShortUrl] = useState('');
  const [longUrl, setLongUrl] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alerta, setAlerta] = useState('');

  const handleAddOrUpdateUrl = async () => {
    let finalLongUrl = longUrl;
    
    // Validar y corregir el formato de la URL antes de usarla
    if (!finalLongUrl.startsWith('https://') && !finalLongUrl.startsWith('http://')) {
      setAlerta('We detected that your url doesn\'t start with http:// nor https://, we will add https:// for you. If it should not be https:// edit it.');
      finalLongUrl = 'https://' + finalLongUrl;
    }
  
    try {
      setError('');
      setIsSubmitting(true);
  
      if (!finalLongUrl) {
        setError("An URL is required to be shortened");
        return;
      }
  
      if (edit && item) {
        const updatedUrl = {
          ...item,
          shortUrl,
          longUrl: finalLongUrl, // Usar la URL procesada
          description,
          tags: selectedTags,
        };
        await updateUrl(
          item.shortUrl, 
          item.longUrl, 
          shortUrl, 
          finalLongUrl, 
          selectedTags, 
          item.tags, 
          description,
          item.description
        );
        if (updateUrl.error) {
          setError(updateUrl.error);
          return;
        }
        console.log(updatedUrl);
        updateUrlsLocally(updatedUrl, true);
      } else {
        const newUrl = await createShortUrl(
          userId, 
          finalLongUrl, 
          shortUrl, 
          selectedTags, 
          description
        );
  
        if (newUrl.error) {
          setError(newUrl.error);
          return;
        }
  
        let urlData = {
          id: newUrl.id,
          shortUrl,
          longUrl: finalLongUrl, // Usar la URL procesada
          description,
          tags: selectedTags,
        };
        updateUrlsLocally(urlData);
      }
      setShowUrlForm(false);
    } catch (e) {
      console.log(e.message);
      if (e.message === "Invalid short URL") {
        setError("La URL corta solo puede contener letras, números y los siguientes caracteres especiales: -._~:/?#[]@!$&'()*+,;=");
      } else {
        setError("Ha ocurrido un error al procesar tu solicitud. Por favor, intenta de nuevo.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  useEffect(()=>{
    if (alerta){
      alert(alerta)
    }
  },[alerta])

  useEffect(() => {
    if (edit && item) {
      setShortUrl(item.shortUrl);
      setLongUrl(item.longUrl);
      setDescription(item.description);
      setSelectedTags(item.tags);
    }
  }, [edit, item]);

  const handleShortUrlChange = (e) => {
    const inputValue = e.target.value.replace('https://keys.lat/', '').trim();
    setShortUrl(inputValue);
    setError('');
  };

  const handleTagSelection = (tagId, tagName) => {
    setSelectedTags((prevTags) => {
      const exists = prevTags.some((tag) => tag.id === tagId);
      return exists
        ? prevTags.filter((tag) => tag.id !== tagId)
        : [...prevTags, { id: tagId, name: tagName }];
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[101]">
      <div className="bg-black border-2 border-white p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{edit ? "Edit URL" : "Add URL"}</h3>
          <button
            onClick={() => setShowUrlForm(false)}
            className="p-2 hover:bg-white hover:text-black transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-900 border-2 border-red-500 text-white">
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddOrUpdateUrl();
          }}
        >
          <div>
            <label className="block mb-2">Short URL</label>
            <input
              type="text"
              value={shortUrl ? `https://keys.lat/${shortUrl}` : ''}
              onChange={handleShortUrlChange}
              placeholder="Leave blank for random"
              className={`w-full p-2 bg-black border-2 ${error ? 'border-red-500' : 'border-white'}`}
            />
          </div>
          <div>
            <label className="block mb-2">Long URL</label>
            <div className={`flex items-center border-2 ${error ? 'border-red-500' : 'border-white'}`}>
              <LinkIcon className="w-5 h-5 mx-2" />
              <input
                type="text"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                placeholder="https://example.com/areallyreally/verylongurl/butreallylong"
                className="flex-1 p-2 bg-transparent focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 bg-transparent border-2 border-white focus:outline-none min-h-[100px]"
              placeholder="Add a description for this URL..."
            />
          </div>
          <div>
            <label className="block mb-2">Tags</label>
            <div className="flex flex-wrap gap-2 p-2 border-2 border-white">
              {tagLoading ? 
                <SkeletonTag /> : 
                    tags.map((tag) => (
                      <label key={tag.id} className="flex items-center gap-2 p-2 border border-white">
                        <input
                          type="checkbox"
                          checked={selectedTags.some((selectedTag) => selectedTag.id === tag.id)}
                          onChange={() => handleTagSelection(tag.id, tag.name)}
                          title={tag.description}
                        />
                        {tag.name}
                      </label>
                    ))
              }
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => setShowUrlForm(false)}
              className="px-4 py-2 border border-white hover:bg-white hover:text-black transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-white text-black hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? "Processing..." 
                : edit 
                  ? "Save Changes" 
                  : "Create URL"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUrlModal;