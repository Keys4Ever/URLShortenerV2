import express from 'express';
import { 
    getUserInfoController, 
    getAllUsersController, 
    updateUserController, 
    deleteUserController, 
    createUserController 
} from '../controllers/userController.js';

const router = express.Router();

router.get('/:id', getUserInfoController);
router.get('/', getAllUsersController);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);
router.post('/', createUserController);

export default router;
