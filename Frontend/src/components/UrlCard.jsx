import { Copy, Edit, Trash2 } from 'lucide-react';

function UrlCard({ item }) {
  return (
    <div className="p-4 border-2 border-white">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold">https://keys.lat/{item.shortUrl || "URL no disponible"}</span>
            <button className="p-1 hover:bg-white hover:text-black transition rounded">
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <p className="text-gray-400 text-sm break-all">{item.longUrl || "URL completa no disponible"}</p>
          {item.description && (
            <p className="text-sm text-gray-400 mt-1">{item.description}</p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-bold">{item.clicks !== undefined ? `${item.clicks} clicks` : "Clicks no disponible"}</p>
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
