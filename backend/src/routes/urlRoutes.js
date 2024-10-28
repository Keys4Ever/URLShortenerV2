import express from 'express';
import {
    createShortUrlController,
    getOriginalUrlController,
    deleteUrlController,
    updateUrlController,
    getUserUrlsController,
    getAllFromUrlController
} from '../controllers/urlController.js';

const router = express.Router();

router.post('/url', createShortUrlController);
router.get('/:shortUrl', getOriginalUrlController);
router.delete('/url/:shortUrl', deleteUrlController);
router.put('/url', updateUrlController);
router.get('/url/:userId', getUserUrlsController);
router.get('/url/details/:shortUrl', getAllFromUrlController);

export default router;
