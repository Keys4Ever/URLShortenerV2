import express from 'express';
import { 
    getUserInfoController, 
    getAllUsersController,
    updateUserController,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/:id', getUserInfoController);
router.get('/', getAllUsersController);

export default router;
