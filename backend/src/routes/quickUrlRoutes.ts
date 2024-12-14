import { Router } from 'express';
import { quickControllers } from '../controllers/quickController.js';
import { asyncHandler } from '../utils/AsyncHandler.js';

export const quickRouter = Router();

quickRouter.post('/', asyncHandler(quickControllers.create));
quickRouter.post('/connect', asyncHandler(quickControllers.connect));

export default quickRouter;