import express from 'express';
import { statsController } from '../controllers/statsController';

const statsRouter = express.Router();

statsRouter.get('/:shortUrl/:day', statsController.getStats);
statsRouter.put('/:shortUrl', statsController.updateStats);

export default statsRouter;