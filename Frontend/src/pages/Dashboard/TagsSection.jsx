import { useState } from 'react';
import { Plus } from 'lucide-react';
import Tag from '../../components/Tag';
import AddTagModal from './AddTagModal';

const TagsSection = ({ tags, isLoading, setTags, userId }) => {
    const [selectedTags, setSelectedTags] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [tagIdToEdit, setTagIdToEdit] = useState(null);
    const [edit, setEdit] = useState(false);

    const addTag = (newTag) => {
        console.log(newTag);
        setTags((prevTags) => [...prevTags, newTag]);
    };

    const handleEditTag = (tagId) => {
        setEdit(true);
        setTagIdToEdit(tagId);
        setShowAddForm(true);
    };

    if (isLoading) {
        return <p className='text-black dark:text-white'>Cargando tags...</p>;
    }

    return (
        <div className="border-2 border-white p-4 mb-6">
            {showAddForm && (
                <AddTagModal
                    userId={userId}
                    setShowAddForm={setShowAddForm}
                    addTag={addTag}
                    setTags={setTags}
                    {...(edit && { edit: true, tagId: tagIdToEdit })}
                />
            )}
            <div className="flex flex-wrap gap-2 mb-4">
                {tags.length === 0 ? (
                    <p className='text-black dark:text-white'>No tags found</p>
                ) : (
                    tags.map(tag => (
                            <Tag
                                setTags={setTags}
                                selectedTags={selectedTags}
                                setSelectedTags={setSelectedTags}
                                tag={tag}
                                userId={userId}
                                handleEditTag={handleEditTag}
                                key={tag.id}
                            />
                    ))
                )}
            </div>
            <button onClick={() => setShowAddForm(true)} className="flex items-center gap-2 px-4 py-2 border border-white hover:bg-white hover:text-black transition">
                <Plus className="w-4 h-4" />
                Add Tag
            </button>
        </div>
    );
};

export default TagsSection;
