import { ArrowRight } from "lucide-react";
import ResultURL from "./ResultURL";
import { useState } from "react";
import { getOriginalUrl } from "../../services/urlServices";

const LookURLSection = () => {
    const [url, setUrl] = useState(null);
    const [shortUrl, setShortUrl] = useState("");
    const [hasTried, setHasTried] = useState(false);  // Usa estado para `hasTried`

    const handleShortUrlChange = (event) => {
        setShortUrl(event.target.value);
    };

    const handleGetUrl = async (event) => {
        event.preventDefault();
        if (shortUrl) {
            try {
                const response = await getOriginalUrl(shortUrl);

                if (response?.originalUrl) {
                    setUrl(response.originalUrl);
                } else {
                    setUrl(null);
                }
            } catch (error) {
                console.error("Error fetching the original URL:", error);
                setUrl(null); 
            } finally {
                setHasTried(true);
            }
        }
    };

    return (
        <section className="max-w-5xl mx-auto px-4 py-24 flex items-center">
            <div className="border-4 border-white p-8 text-left w-full mb-6">
                <h2 className="text-4xl font-bold mb-6">Doubts about a URL? See where it
                    <br />
                    goes.
                </h2>

                <form className="space-y-6" onSubmit={handleGetUrl}>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Paste your shortened URL here..."
                            className="flex-1 px-4 py-3 bg-transparent border-2 border-white focus:outline-none focus:border-gray-400 transition"
                            onChange={handleShortUrlChange}
                            value={shortUrl}
                        />
                        <button 
                            type="submit"
                            className="flex items-center px-6 py-3 bg-white text-black font-bold hover:bg-gray-200 transition"
                        >
                            Check URL
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                    </div>
                </form>

                {/* Mostrar `ResultURL` solo si `url` tiene un valor o mensaje de error si `hasTried` es verdadero */}
                {url ? (
                    <ResultURL url={url} />
                ) : hasTried && (
                    <p className="text-white">No URL found. Please check the shortened URL.</p>
                )}
            </div>
        </section>
    );
};

export default LookURLSection;
