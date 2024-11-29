import { Edit, X } from "lucide-react";
import { deleteTag } from "../services/tagServices";

const Tag = ({ selectedTags, setSelectedTags, tag, setTags, userId, handleEditTag }) => {
    const handleDelete = async (id, userId) => {
        try {
            await deleteTag(userId, id);
            setTags(prevTags => prevTags.filter(t => t.id !== id));
        } catch (error) {
            console.error("Error al eliminar la etiqueta:", error);
            alert("No se pudo eliminar la etiqueta. Por favor, intenta de nuevo.");
        }
    };

    return (
        <div className="flex items-center gap-2 border border-white p-2 whitespace-nowrap">
            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={selectedTags.includes(tag.name)}
                    onChange={(e) => {
                        if (e.target.checked) {
                            setSelectedTags([...selectedTags, tag.name]);
                        } else {
                            setSelectedTags(selectedTags.filter(t => t !== tag.name));
                        }
                    }}
                    className="form-checkbox"
                />
                <span title={tag.description}>{tag.name}</span>
            </label>
            <div className="flex items-center gap-1">
                <button
                    onClick={() => handleEditTag(tag.id)}
                    className="p-1 hover:bg-white hover:text-black transition"
                >
                    <Edit className="w-4 h-4" />
                </button>
                <button
                    className="p-1 hover:bg-white hover:text-black transition"
                    onClick={() => handleDelete(tag.id, userId)}
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default Tag;