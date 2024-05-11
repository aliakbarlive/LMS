import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { userProfile } from '../../controllers/userControllers';

const router = express.Router();

// Get User Profile
router.get('/profile',authMiddleware, userProfile);

export default router;
