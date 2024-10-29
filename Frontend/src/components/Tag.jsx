import { Edit, X } from "lucide-react";
import { deleteTag } from "../services/tagServices";

const Tag = ({ selectedTags, setSelectedTags, tag, setTags, userId }) => {
    const handleDelete = async (id, userId) => {
        try {
            await deleteTag(userId, id);

            // Actualiza el estado o realiza cualquier otra acción necesaria después de la eliminación
            // Filtra las etiquetas eliminadas del estado de etiquetas
            setTags(prevTags => prevTags.filter(t => t.id !== id));
        } catch (error) {
            // Manejo de errores, mostrar un mensaje de error
            console.error("Error al eliminar la etiqueta:", error);
            alert("No se pudo eliminar la etiqueta. Por favor, intenta de nuevo.");
        }
    };

    return (
        <div key={tag.id} className="flex items-center gap-2 border border-white p-2">
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
                    className="p-1 hover:bg-white hover:text-black transition"
                >
                    <Edit className="w-4 h-4" />
                </button>
                <button
                    className="p-1 hover:bg-white hover:text-black transition"
                    onClick={() => handleDelete(tag.id, userId)} // Corrección aquí
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default Tag;
