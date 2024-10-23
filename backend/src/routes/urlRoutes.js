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
router.get('/:url', getOriginalUrlController);
router.delete('/url/:shortUrl', deleteUrlController);
router.put('/url', updateUrlController);
router.get('/urls/:userId', getUserUrlsController);
router.get('/url/details/:shortUrl', getAllFromUrlController);

export default router;
