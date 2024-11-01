import { Plus, Search } from "lucide-react";
import { useState } from "react";
import AddUrlModal from "./AddUrlModal";

const SearchAndActionBar = ({tags, userId}) => {
    const [searchBy, setSearchBy] = useState('short');
    const [showUrlForm, setShowUrlForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <div className="flex justify-between items-center mb-6">
        {showUrlForm && <AddUrlModal tags={tags} setShowUrlForm={setShowUrlForm} userId={userId} />}
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search by ${searchBy} URL...`}
                    className="w-full pl-10 pr-32 py-2 bg-transparent border-2 border-white focus:outline-none"
                />
                <div className="absolute right-0 top-0 h-full">
                    <button
                        className="h-full px-4 border-l-2 border-white hover:bg-white hover:text-black transition font-bold"
                        onClick={() => setSearchBy(searchBy === 'short' ? 'long' : 'short')}

                    >
                        {searchBy.toUpperCase()}
                    </button>
                </div>
            </div>
            <button
                className="px-6 py-2 bg-white text-black hover:bg-gray-200 transition flex items-center gap-2"
                onClick={()=>setShowUrlForm(true)}
            >
                <Plus className="w-5 h-5" />
                New URL
            </button>
        </div>
    );
};

export default SearchAndActionBar;