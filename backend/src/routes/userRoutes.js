import express from 'express';
import { 
    getUserInfoController, 
    getAllUsersController, 
    createUserController 
} from '../controllers/userController.js';

const router = express.Router();

router.get('/:id', getUserInfoController);
router.get('/', getAllUsersController);
router.post('/', createUserController);

export default router;
