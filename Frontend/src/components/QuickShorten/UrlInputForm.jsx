import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const UrlInputForm = ({ isLoading, onShorten, error }) => {
  const [url, setUrl] = useState('');

  const handleUrlChange = (e) => setUrl(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onShorten) onShorten(url);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="flex gap-4">
        <input
          type="url"
          placeholder="Paste your long URL here..."
          className="flex-1 px-4 py-3 bg-transparent border-2 border-white focus:outline-none focus:border-gray-400 transition"
          onChange={handleUrlChange}
          value={url}
          disabled={isLoading}
          required
        />
        <button
          type="submit"
          className="flex items-center px-6 py-3 bg-white text-black font-bold hover:bg-gray-200 transition disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Shorten'}
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </form>
  );
};

export default UrlInputForm;
