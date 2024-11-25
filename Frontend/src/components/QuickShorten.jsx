import React, { useState } from 'react';
import { Link as LinkIcon, ArrowRight, Copy, CheckCircle } from 'lucide-react';
import SecretInput from './SecretInput.jsx';
import { useAuth } from '../context/authContext.jsx';
import { quickShort } from '../services/quickShortServices.js';
import { createShortUrl } from '../services/urlServices.js';

const QuickShorten = () => {
  const { auth, loading } = useAuth();
  const [url, setUrl] = useState('');
  const [secretKey, setSecretKey] = useState(null)
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleUrlChange = (e) => setUrl(e.target.value);

  const handleShortenUrl = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setIsLoading(true);

    try {
      const response = !auth.authenticated ? await quickShort(url) : await createShortUrl(auth.user.sub.split('|')[1], url)
      console.log(auth.user.sub.split('|')[1])
      if (!response.success) {
        throw new Error(response.error || 'Error shortening URL');
      }

      const generatedShortUrl = `keys.lat/${auth.authenticated ? response.url : response.shortUrl}`;
      setShortUrl(generatedShortUrl);
      if(!auth.authenticated){
        setSecretKey(response.secretKey);
      }
      await navigator.clipboard.writeText(generatedShortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-10 flex items-center">
      <div className="border-4 border-white p-8 text-left w-full mb-6">
        <h2 className="text-4xl font-bold mb-6">
          Shorten your URL quickly and easily
          <br />
          with our service.
        </h2>

        <form className="space-y-6" onSubmit={handleShortenUrl}>
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
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {shortUrl && (
          <div className="p-4 border-2 border-white mt-6">
            <div className="flex items-center justify-between">
              <span className="font-bold">{shortUrl}</span>
              <div className="flex items-center gap-2">
                {copied ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
                <span className="text-sm">{copied ? 'Copied!' : 'Copy URL'}</span>
              </div>
            </div>
          </div>
        )}

        {!loading && shortUrl && secretKey && (
          <div className="mt-6 p-4 border-2 border-white">
            <p className="text-sm text-gray-300">
              Secret key (use this to add the URL to your account):
            </p>
            <SecretInput secretKey={secretKey} />
          </div>
        )}
      </div>
    </section>
  );
};

export default QuickShorten;
