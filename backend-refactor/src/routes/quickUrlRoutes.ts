import { Router } from 'express';
import { quickControllers } from '../controllers/quickController';
import { asyncHandler } from '../utils/AsyncHandler';

export const quickRouter = Router();

quickRouter.post('/', asyncHandler(quickControllers.create));
quickRouter.post('/connect', asyncHandler(quickControllers.connect));

export default quickRouter;