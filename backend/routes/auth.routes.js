import { Router } from 'express';
import { syncUser } from '../controllers/auth.controller.js'; // Use import here

const authRoutes = Router();

authRoutes.post('/sync-user', syncUser);

export default authRoutes;
