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

router.post('/', createShortUrlController);
router.get('/:shortUrl', getOriginalUrlController);
router.delete('/:shortUrl', deleteUrlController);
router.put('/', updateUrlController);
router.get('/user/:userId', getUserUrlsController);
router.get('/details/:shortUrl', getAllFromUrlController);

export default router;
