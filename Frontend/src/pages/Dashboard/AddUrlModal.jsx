import { LinkIcon, X } from "lucide-react";

const AddUrlModal = ({tags}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-black border-2 border-white p-6 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Add URL</h3>
                    <button className="p-2 hover:bg-white hover:text-black transition">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <form className="space-y-4">
                    <div>
                        <label className="block mb-2">Short URL</label>
                        <input
                            type="text"
                            placeholder="Leave in blank for random"
                            className="w-full p-2 bg-black border-2 border-white"
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Long URL</label>
                        <div className="flex items-center border-2 border-white">
                            <LinkIcon className="w-5 h-5 mx-2" />
                            <input
                                type="url"
                                required
                                placeholder="https://example.com/areallyreally/verylongurl/butreallylong"
                                className="flex-1 p-2 bg-transparent focus:outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2">Description</label>
                        <textarea
                            className="w-full p-2 bg-transparent border-2 border-white focus:outline-none min-h-[100px]"
                            placeholder="Add a description for this URL..."
                        />
                    </div>
                        <div>
                            <label className="block mb-2">Tags</label>
                            <div className="flex flex-wrap gap-2 p-2 border-2 border-white">
                            {tags.map(tag => (
                                <label key={tag.id} className="flex items-center gap-2 p-2 border border-white">
                                    <input data-id={tag.id} type="checkbox" title={tag.description} />
                                    {tag.name}
                                </label>
                            ))}
                            </div>
                        </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button className="px-4 py-2 border border-white hover:bg-white hover:text-black transition">
                            Cancel
                        </button>
                        <button className="px-4 py-2 bg-white text-black hover:bg-gray-200 transition">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddUrlModal;