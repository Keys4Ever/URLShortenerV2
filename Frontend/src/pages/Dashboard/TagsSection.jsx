import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Tag from "../../components/Tag";
import AddTagModal from "./AddTagModal";
import SkeletonTag from "./SkeletonTag";
import useUserUrls from "../../hooks/useUserUrls";

const TagsSection = ({ tags, isLoading, setTags, userId, setUrlItems }) => {
    const [selectedTags, setSelectedTags] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [tagIdToEdit, setTagIdToEdit] = useState(null);
    const [edit, setEdit] = useState(false);

    const originalUrls = useUserUrls(userId, setUrlItems);

    // Filtrar URLs por etiquetas seleccionadas
    useEffect(() => {                    
        if (selectedTags.length === 0) {
            setUrlItems(originalUrls);
        } else {
            const filteredUrls = originalUrls.filter((url) =>
                url.tags.some((tag) => selectedTags.includes(tag.name))
            );
            setUrlItems(filteredUrls);
        }
    }, [selectedTags, originalUrls, setUrlItems]);

    const addTag = (newTag) => {
        if(tags){
            console.log(tags)
            setTags((prevTags) => [...prevTags, newTag]);
        }else{
            setTags([newTag]);
        }
    };

    const handleEditTag = (tagId) => {
        setEdit(true);
        setTagIdToEdit(tagId);
        setShowAddForm(true);
    };

    return (
        <div className="border-2 border-white p-4 mb-6">
            {console.log("TAGSSS",tags)}
            {showAddForm && (
                <AddTagModal
                    userId={userId}
                    setShowAddForm={setShowAddForm}
                    addTag={addTag}
                    setTags={setTags}
                    {...(edit && { edit: true, tagId: tagIdToEdit })}
                />
            )}
            <div 
                className="flex overflow-x-auto gap-2 mb-4 pb-2 scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent"
                style={{
                    WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
                    scrollbarWidth: 'thin', // Firefox smooth scrollbar
                }}
            >
                {isLoading ? (
                    <>
                        <SkeletonTag bigTag />
                        <SkeletonTag bigTag />
                    </>
                ) : tags.error || tags.length == '0' ? (
                    <p className="text-white">No tags found</p>
                ) : (
                    tags.map((tag) => (
                        <div 
                            key={tag.id}
                            className="flex-shrink-0" // Prevents tags from shrinking
                        >
                            <Tag
                                setTags={setTags}
                                selectedTags={selectedTags}
                                setSelectedTags={setSelectedTags}
                                tag={tag}
                                userId={userId}
                                handleEditTag={handleEditTag}
                            />
                        </div>
                    ))
                )}
            </div>
            <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-4 py-2 border border-white hover:bg-white hover:text-black transition"
            >
                <Plus className="w-4 h-4" />
                Add Tag
            </button>
        </div>
    );
};

export default TagsSection;