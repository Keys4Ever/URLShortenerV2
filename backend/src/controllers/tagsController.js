import {
    createTag,
    getTag,
    getAllTags,
    updateTag,
    deleteTag,
    addTagToUrl
} from '../services/tagsServices.js';

// Create Tag Controller
export const createTagController = async (req, res) => {
    const { name, description } = req.body;
    const userId = req.user.id;

    try {
        const result = await createTag(name, description, userId);
        res.status(201).json({ success: true, tagId: result.tagId });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get a single Tag Controller
export const getTagController = async (req, res) => {
    const userId = req.user.id;
    const { tagId } = req.params;

    try {
        const tag = await getTag(userId, tagId);
        res.status(200).json({ success: true, tag });
    } catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
};

// Get all Tags for a User Controller
export const getAllTagsController = async (req, res) => {
    const userId = req.user.id;

    try {
        const tags = await getAllTags(userId);
        res.status(200).json({ success: true, tags });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update Tag Controller
export const updateTagController = async (req, res) => {
    const userId = req.user.id;
    const { tagId } = req.params;
    const { name, description } = req.body;

    try {
        await updateTag(userId, tagId, name, description);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete Tag Controller
export const deleteTagController = async (req, res) => {
    const userId = req.user.id;
    const { tagId } = req.params;

    try {
        await deleteTag(userId, tagId);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
};

// Associate Tag with URL Controller
export const addTagToUrlController = async (req, res) => {
    const { urlId, tagId } = req.body;

    try {
        await addTagToUrl(urlId, tagId);
        res.status(201).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
