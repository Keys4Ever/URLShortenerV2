import React, { useState } from 'react';
import { Link as LinkIcon, Copy, CheckCircle } from 'lucide-react';
import SecretInput from './SecretInput.jsx';
import { useAuth } from '../context/authContext.jsx';

const QuickShorten = () => {
  const { auth, loading } = useAuth();
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const secretKey = 'SECRETKEY'; // Simulación de clave secreta
    const generated = `keys.url/${Math.random().toString(36).substr(2, 6)}`;
    setShortUrl(generated);
    await navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border-4 border-white p-8 space-y-6">
      {/* Formulario principal */}
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

      {/* Mostrar clave secreta si no está autenticado y ha cargado */}
      {!loading && !auth.authenticated && shortUrl && (
        <div className="space-y-2 border-2 border-white p-4">
          <p className="text-sm text-gray-300">
            Secret key (use this to link this to your acc):
          </p>
          <SecretInput secretKey="SECRETKEY" />
        </div>
      )}

      {/* Mostrar URL acortada */}
      {shortUrl && (
        <div className="p-4 border-2 border-white space-y-2">
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


export default QuickShorten;