import express from 'express';
import {
    createTagController,
    getTagController,
    getAllTagsController,
    updateTagController,
    deleteTagController,
    addTagToUrlController
} from '../controllers/tagsController.js';

const router = express.Router();

// Ruta para crear un nuevo tag
router.post('/', createTagController);

// Ruta para obtener un tag específico por ID
router.get('/:tagId', getTagController);

// Ruta para obtener todos los tags de un usuario
router.get('/', getAllTagsController);

// Ruta para actualizar un tag específico por ID
router.put('/:tagId', updateTagController);

// Ruta para eliminar un tag específico por ID
router.delete('/:tagId', deleteTagController);

// Ruta para asociar un tag con una URL
router.post('/url-tags', addTagToUrlController);

export default router;
