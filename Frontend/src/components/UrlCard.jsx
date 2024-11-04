import { Copy, Edit, Trash2, QrCode } from 'lucide-react';
import QRCode from 'qrcode';

const UrlCard = ({ item }) => {
  const shortUrl = "https://keys.lat/" + item.shortUrl;

  const copyQrCode = async () => {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(shortUrl);
      const blob = await (await fetch(qrCodeDataUrl)).blob();
      const clipboardItem = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([clipboardItem]); 
      alert('QR copiado al portapapeles');
    } catch (error) {
      console.error('Error al copiar el QR:', error);
    }
  };

  return (
    <div className="p-4 border-2 border-white">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold">{shortUrl || "URL no disponible"}</span>
            <button
              className="p-1 hover:bg-white hover:text-black transition rounded"
              onClick={() => navigator.clipboard.writeText(shortUrl)}
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              className="p-1 hover:bg-white hover:text-black transition rounded"
              onClick={() => copyQrCode()}
            >
              <QrCode className="w-4 h-4" />
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
            <button className="p-2 hover:bg-white hover:text-black transition rounded">
              <Edit className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white hover:text-black transition rounded">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        {(item.tags || []).map((tag, index) => (
          <span key={tag.id} className="px-2 py-1 text-sm border border-white">
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default UrlCard;
