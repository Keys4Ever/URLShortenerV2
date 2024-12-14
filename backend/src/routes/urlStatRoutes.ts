import express from 'express';
import { statsController } from '../controllers/statsController.js';

const statsRouter = express.Router();

statsRouter.get('/:shortUrl/:day', statsController.getStats);
statsRouter.put('/:shortUrl', statsController.updateStats);

export default statsRouter;