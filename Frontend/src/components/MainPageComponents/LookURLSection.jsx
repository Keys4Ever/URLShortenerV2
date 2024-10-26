import { ArrowRight } from "lucide-react";
import ResultURL from "./ResultURL";

const LookURLSection = () => {
    return (
        <section className="max-w-5xl mx-auto px-4 py-24 flex items-center">
            <div className="border-4 border-white p-8 text-left w-full mb-6">
                <h2 className="text-4xl font-bold mb-6">Doubts about a URL? See where it
                    <br/>
                    goes.</h2>
                
                <form className="space-y-6">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Paste your shortened URL here..."
                            className="flex-1 px-4 py-3 bg-transparent border-2 border-white focus:outline-none focus:border-gray-400 transition"
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
                <ResultURL url="example.com" />
            </div>
        </section>
    );
};

export default LookURLSection;
