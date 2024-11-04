// UrlCard.jsx

import { useState } from 'react';
import { Copy, Edit, Trash2, QrCode, Check } from 'lucide-react';
import QRCode from 'qrcode';
import AddUrlModal from '../pages/Dashboard/AddUrlModal';

const UrlCard = ({ item, userId, onUpdate }) => {
  const shortUrl = "https://keys.lat/" + item.shortUrl;

  const [showUrlForm, setShowUrlForm] = useState(false);
  const [copying, setCopying] = useState(false);
  const [qrCopied, setQrCopied] = useState(false);

  const handleCopyUrl = async () => {
    setCopying(true);
    await navigator.clipboard.writeText(shortUrl);
    setTimeout(() => setCopying(false), 2000);
  };

  const copyQrCode = async () => {
    try {
      setQrCopied(true);
      const qrCodeDataUrl = await QRCode.toDataURL(shortUrl);
      const blob = await (await fetch(qrCodeDataUrl)).blob();
      const clipboardItem = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([clipboardItem]);
      alert('QR copiado al portapapeles');
      setTimeout(() => setQrCopied(false), 2000);
    } catch (error) {
      console.error('Error al copiar el QR:', error);
      setQrCopied(false);
    }
  };

  const handleEditUrl = () => {
    setShowUrlForm(true);
  };

  return (
    <>
      {showUrlForm && (
        <AddUrlModal
          tags={item.tags}
          setShowUrlForm={setShowUrlForm}
          userId={userId}
          edit={true}
          item={item}
          onSave={() => {
            setShowUrlForm(false);
            onUpdate(); // Llama a onUpdate después de guardar
          }}
        />
      )}
      <div className="p-4 border-2 border-white">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold">{shortUrl || "URL no disponible"}</span>
              <button
                className="p-1 hover:bg-white hover:text-black transition rounded"
                onClick={handleCopyUrl}
              >
                {copying ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                className="p-1 hover:bg-white hover:text-black transition rounded"
                onClick={copyQrCode}
              >
                {qrCopied ? <Check className="w-4 h-4" /> : <QrCode className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-gray-400 text-sm break-all">
              {item.longUrl || "URL completa no disponible"}
            </p>
            {item.description && (
              <p className="text-sm text-gray-400 mt-1">{item.description}</p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-bold">
                {item.clicks !== undefined ? `${item.clicks} clicks` : "Clicks no disponible"}
              </p>
              <p className="text-sm text-gray-400">{item.date || "Fecha no disponible"}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white hover:text-black transition rounded" onClick={handleEditUrl}>
                <Edit className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white hover:text-black transition rounded">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {item.tags.map((tag) => (
            <span key={tag.id} className="px-2 py-1 border border-gray-400 text-sm text-gray-400 rounded">
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default UrlCard;
