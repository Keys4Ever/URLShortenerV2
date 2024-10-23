import express from 'express';
import { 
    updateClicksController, 
    getOneDayClicksController 
} from '../controllers/urlStatController.js';

const router = express.Router();

router.put('/:shortUrl', updateClicksController);
router.get('/:id/:day', getOneDayClicksController);

export default router;
