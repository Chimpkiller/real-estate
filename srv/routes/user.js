import express from 'express';
import { roleMiddleware } from '../middleware/auth.js';
import * as userController from '../controllers/user.js';

const router = express.Router()

router.get('/users', roleMiddleware, userController.getUsers);
// router.get('/listings/:id', roleMiddleware, userController.getListingDetails);
router.post('/login', roleMiddleware, userController.loginUser)

export default router;