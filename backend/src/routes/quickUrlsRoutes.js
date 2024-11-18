import express from 'express';
import {
    createQuickUrlController,
    connectUrlToAccController,
} from '../controllers/quickUrlsController.js';

const router = express.Router();

// Ruta para crear una Quick URL
router.post('/', createQuickUrlController);

// Ruta para conectar una Quick URL a una cuenta
router.post('/connect', connectUrlToAccController);

export default router;
