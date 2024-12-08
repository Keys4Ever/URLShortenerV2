import { Router } from 'express';
import { tagController } from '../controllers/tagsController';
import { asyncHandler } from '../utils/AsyncHandler';

export const tagsRouter = Router();

tagsRouter.post('/', asyncHandler(tagController.create));
tagsRouter.get('/:userId', asyncHandler(tagController.getAll));
tagsRouter.get('/:userId/:tagId', asyncHandler(tagController.get));
tagsRouter.put('/:userId/:tagId', asyncHandler(tagController.update));
tagsRouter.delete('/:userId/:tagId', asyncHandler(tagController.delete));
tagsRouter.post('/url-tags', asyncHandler(tagController.addToUrl));

export default tagsRouter;