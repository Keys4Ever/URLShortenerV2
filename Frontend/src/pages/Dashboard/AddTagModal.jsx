import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { createTag, getTag, updateTag } from "../../services/tagServices";

const AddTagModal = ({ userId, setShowAddForm, addTag, edit, tagId, setTags }) => {
    const [tagName, setTagName] = useState('');
    const [tagDescription, setTagDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const populateForm = async (tagId) => {
        setIsLoading(true);
        try {
            const response = await getTag(userId, tagId);
            if (response) {
                console.log(response);
                setTagName(response.name);
                setTagDescription(response.description);
            }
        } catch (e) {
            console.error("Error al obtener el tag:", e);
        } finally {
            setIsLoading(false);
        }
    };

    const editTag = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await updateTag(tagId, tagName, tagDescription, userId);
    
            if (response.success) {
                const updatedTag = {
                    id: tagId,
                    name: tagName,
                    description: tagDescription
                };
                setTags((prevTags) =>
                    prevTags.map((tag) => (tag.id === tagId ? updatedTag : tag))
                );
                alert("Tag updated successfully :D");
                setShowAddForm(false);
            } else {
                alert("Error editing tag, please try again. \n If the problem persists, contact the admin.");
            }
        } catch (error) {
            console.error("Error al editar:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (edit && tagId) {
            populateForm(tagId);
        }
    }, [edit, tagId]);

    const handleAddForm = async (event) => {
        event.preventDefault();
        if(tagName.length < 1){
            alert("Tag name cannot be empty");
            return;
        }
        if(tagName.length > 20){
            alert("Tag name cannot be longer than 20 characters");
            return;
        }
        
        setIsLoading(true);
        try {
            const response = await createTag(tagName, tagDescription, userId);
            const newTag = {
                name: tagName,
                description: tagDescription,
                id: response.tagId
            };

            if (response.success) {
                addTag(newTag);
                alert("Tag added successfully :D");
                setShowAddForm(false);
            } else {
                alert("Error adding tag, please try again. \n If the problem persists, contact the admin.");
            }
        } catch (error) {
            console.error("Error al añadir el tag:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[101]">
            <div className="bg-black border-2 border-white p-6 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">{edit ? "Edit Tag" : "Add New Tag"}</h3>
                    <button 
                        onClick={() => setShowAddForm(false)} 
                        className="p-2 hover:bg-white hover:text-black transition"
                        disabled={isLoading}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={edit ? editTag : handleAddForm} className="space-y-4">
                    <div>
                        <label className="block mb-2">Tag Name</label>
                        <input
                            type="text"
                            placeholder="Enter tag name"
                            required
                            disabled={isLoading}
                            value={tagName}
                            onChange={(e) => setTagName(e.target.value)}
                            className={`w-full p-2 bg-transparent border-2 border-white focus:outline-none ${
                                isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Description</label>
                        <textarea
                            className={`w-full p-2 bg-transparent border-2 border-white focus:outline-none min-h-[100px] ${
                                isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            placeholder="Add a description for this tag..."
                            value={tagDescription}
                            onChange={(e) => setTagDescription(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => setShowAddForm(false)}
                            className={`px-4 py-2 border border-white hover:bg-white hover:text-black transition ${
                                isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`px-4 py-2 bg-white text-black hover:bg-gray-200 transition ${
                                isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Loading...' : (edit ? "Save Changes" : "Add Tag")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTagModal;