import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = express.Router();

// Get User Profile
router.get("/", authMiddleware);

export default router;
