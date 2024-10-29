import { Edit, X } from "lucide-react";
const Tag = ({selectedTags, setSelectedTags, tag}) => {
    return(
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
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
}

export default Tag;