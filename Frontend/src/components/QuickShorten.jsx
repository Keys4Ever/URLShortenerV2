import React, { useState } from 'react';
import { Link as LinkIcon, Copy, CheckCircle } from 'lucide-react';

export default function QuickShorten() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate API call
    const generated = `keys.url/${Math.random().toString(36).substr(2, 6)}`;
    setShortUrl(generated);
    await navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border-4 border-white p-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center border-2 border-white">
          <LinkIcon className="w-5 h-5 mx-2" />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your long URL here..."
            required
            className="flex-1 p-3 bg-transparent focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-white text-black hover:bg-gray-200 transition font-bold"
          >
            Shorten
          </button>
        </div>
      </form>

      {shortUrl && (
        <div className="mt-4 p-4 border-2 border-white">
          <div className="flex items-center justify-between">
            <span className="font-bold">{shortUrl}</span>
            <div className="flex items-center gap-2">
              {copied ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
              <span className="text-sm">{copied ? 'Copied!' : 'URL copied to clipboard'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}