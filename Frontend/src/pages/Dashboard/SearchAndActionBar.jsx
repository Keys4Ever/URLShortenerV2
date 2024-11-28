import { Lock, Plus, Search } from "lucide-react";
import { useState, useEffect } from "react";
import AddUrlModal from "./AddUrlModal";
import useUserUrls from "../../hooks/useUserUrls";
import AddSecret from "./AddSecret";

const SearchAndActionBar = ({ tags, userId, updateUrlsLocally, setUrlItems, tagLoading }) => {
    const [searchBy, setSearchBy] = useState("short");
    const [showUrlForm, setShowUrlForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showAddSecret, setShowAddSecret] = useState(false);
    const originalUrls = useUserUrls(userId, setUrlItems);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setUrlItems(originalUrls);
        } else {
            const query = searchQuery.trim().toLowerCase();
            if (searchBy === "short") {
                const filteredUrls = originalUrls.filter((url) =>
                    url.shortUrl.toLowerCase().includes(query)
                );
                setUrlItems(filteredUrls);
            } else if (searchBy === "long") {
                const filteredUrls = originalUrls.filter((url) =>
                    url.longUrl.toLowerCase().includes(query)
                );
                setUrlItems(filteredUrls);
            } else if (searchBy === "tags") {
                const filteredUrls = originalUrls.filter((url) =>
                    url.tags.some((tag) => tag.name.toLowerCase().includes(query))
                );
                setUrlItems(filteredUrls);
            }
        }
    }, [searchQuery, searchBy, originalUrls, setUrlItems]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
    <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-4 mb-6">
        {showUrlForm && (
            <AddUrlModal
                tags={tags}
                setShowUrlForm={setShowUrlForm}
                userId={userId}
                updateUrlsLocally={updateUrlsLocally}
                tagLoading={tagLoading}
            />
        )}
        {showAddSecret && (
            <AddSecret
                userId={userId}
                updateUrlsLocally={updateUrlsLocally}
                setShowAddSecret={setShowAddSecret}
            />
        )}
    
        <div className="relative flex-1 max-w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder={`Search by ${searchBy !== "tags" ? searchBy + " URL..." : searchBy}`}
                className="w-full pl-10 pr-32 py-2 bg-transparent border-2 border-white focus:outline-none"
            />
            <div className="absolute right-0 top-0 h-full">
                <button
                    className="h-full px-4 border-l-2 border-white hover:bg-white hover:text-black transition font-bold"
                    onClick={() => {
                        const nextSearchBy =
                            searchBy === "short"
                                ? "tags"
                                : searchBy === "tags"
                                ? "long"
                                : "short";
                        setSearchBy(nextSearchBy);
                    }}
                >
                    {searchBy.toUpperCase()}
                </button>
            </div>
        </div>
    
        <div className="flex flex-wrap sm:flex-nowrap w-full sm:w-auto gap-4 sm:gap-2">
            <button
                className="flex-1 sm:flex-none px-6 py-2 bg-white text-black hover:bg-gray-200 transition flex items-center gap-2 justify-center"
                onClick={() => setShowUrlForm(true)}
            >
                <Plus className="w-5 h-5" />
                <span className="inline">New URL</span>
            </button>
    
            <button
                className="flex-1 sm:flex-none px-6 py-2 bg-white text-black hover:bg-gray-200 transition flex items-center gap-2 justify-center"
                onClick={() => setShowAddSecret(true)}
            >
                <Lock className="w-5 h-5" />
                <span className="inline">Use secret</span>
            </button>
        </div>
    </div>
     );
};

export default SearchAndActionBar;
