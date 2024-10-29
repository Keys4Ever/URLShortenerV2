import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import Tag from '../../components/Tag';

const TagsSection = ({ tags, isLoading, setTags, userId }) => {
    const [selectedTags, setSelectedTags] = useState([]);

    console.log(tags);
    const tagsError = tags.length ? false : true;

    if (isLoading) {
        return <p className='text-black dark:text-white'>Cargando tags...</p>;
    }

    return (
        <div className="border-2 border-white p-4 mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
                {tagsError ? (
                    <p className='text-black dark:text-white'>No tags found</p>
                ) : (
                    tags.map(tag => (
                        <Tag setTags={setTags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} tag={tag} userId={userId} key={tag.id} />
                    ))
                )}
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-white hover:bg-white hover:text-black transition">
                <Plus className="w-4 h-4" />
                Add Tag
            </button>
        </div>
    );
};

export default TagsSection;
