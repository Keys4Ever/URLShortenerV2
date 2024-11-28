import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { createTag, getTag, updateTag } from "../../services/tagServices";

const AddTagModal = ({ userId, setShowAddForm, addTag, edit, tagId, setTags }) => {
    const [tagName, setTagName] = useState('');
    const [tagDescription, setTagDescription] = useState('');

    const populateForm = async (tagId) => {
        try {
            const response = await getTag(userId, tagId); // Corrección de "userId"
            if (response) {
                console.log(response);
                setTagName(response.tag.name);
                setTagDescription(response.tag.description);
            }
        } catch (e) {
            console.error("Error al obtener el tag:", e);
        }
    };

    const editTag = async (event) => {
        event.preventDefault();
        setShowAddForm(false);
    
        try {
            const response = await updateTag(tagId, tagName, tagDescription, userId);
    
            if (response.success) {
                const updatedTag = {
                    id: tagId,
                    name: tagName,
                    description: tagDescription
                };
                // Aquí se llama a la función para actualizar el estado de tags
                setTags((prevTags) =>
                    prevTags.map((tag) => (tag.id === tagId ? updatedTag : tag))
                );
                alert("Tag actualizado con éxito");
            } else {
                alert("Error al actualizar el tag");
            }
        } catch (error) {
            console.error("Error al editar:", error);
        }
    };
    

    useEffect(() => {
        if (edit && tagId) {
            populateForm(tagId);
        }
    }, [edit, tagId]);

    const handleAddForm = async (event) => {
        event.preventDefault();
        setShowAddForm(false);
        if(tagName.length < 1){
            alert("El nombre del tag no puede estar vacío");
            return;
        }
        if(tagName.length > 20){
            alert("El nombre del tag no puede tener más de 20 caracteres");
            return;
        }
        try {
            const response = await createTag(tagName, tagDescription, userId);
            const newTag = {
                name: tagName,
                description: tagDescription,
                id: response.tagId
            };

            if (response.success) {
                addTag(newTag);
                alert("Tag añadida :D");
            } else {
                alert("Error al añadir el tag");
            }
        } catch (error) {
            console.error("Error al añadir el tag:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[101]">
            <div className="bg-black border-2 border-white p-6 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">{edit ? "Edit Tag" : "Add New Tag"}</h3>
                    <button onClick={() => setShowAddForm(false)} className="p-2 hover:bg-white hover:text-black transition">
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
                            value={tagName}
                            onChange={(e) => setTagName(e.target.value)}
                            className="w-full p-2 bg-transparent border-2 border-white focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Description</label>
                        <textarea
                            className="w-full p-2 bg-transparent border-2 border-white focus:outline-none min-h-[100px]"
                            placeholder="Add a description for this tag..."
                            value={tagDescription}
                            onChange={(e) => setTagDescription(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => setShowAddForm(false)}
                            className="px-4 py-2 border border-white hover:bg-white hover:text-black transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-white text-black hover:bg-gray-200 transition"
                        >
                            {edit ? "Save Changes" : "Add Tag"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTagModal;
