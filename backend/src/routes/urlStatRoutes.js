import express from 'express';
import { 
    updateClicksController, 
    getOneDayClicksController 
} from '../controllers/urlStatController.js';

const router = express.Router();

router.put('/clicks/:shortUrl', updateClicksController);
router.get('/clicks/:id/:day', getOneDayClicksController);

export default router;
