import { Router } from 'express';
import { getCurrentUser, updateUserProfile } from '../controllers/user.controller.js';

const userRoutes = Router();

userRoutes.get('/me', getCurrentUser);

userRoutes.put('/me', updateUserProfile);

export default userRoutes;
