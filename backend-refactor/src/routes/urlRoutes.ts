import { Router } from 'express';
import { urlController } from '../controllers/urlController.js';
import { asyncHandler } from '../utils/AsyncHandler.js';

export const urlRouter = Router();

urlRouter.post('/', asyncHandler(urlController.create));
urlRouter.get('/:shortUrl', asyncHandler(urlController.getOriginalUrl));
urlRouter.delete('/:shortUrl', asyncHandler(urlController.delete));
urlRouter.put('/', asyncHandler(urlController.updateUrl));
urlRouter.get('/user/:userId', asyncHandler(urlController.getUserUrls));
urlRouter.get('/details/:shortUrl/:userId', asyncHandler(urlController.getAllFromUrl));

export default urlRouter;
