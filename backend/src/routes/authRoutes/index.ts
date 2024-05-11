import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
  appleLogin,
  checkTokenValidity,
  appleRegister,
  googleOauthLogin,
  googleOauthRegister,
  updateUser,
  createUser,
  getAllUsers,
  deleteUserById,
  getAllUserPendingProfilePic,
  updateUserProfilePic,
} from "../../controllers/authControllers";
import { handleValidationErrors } from "../../validations/validationErrorhandler";
import {
  createUserSchema,
  loginSchema,
  profilePicApprovalSchema,
  registerSchema,
} from "../../validations/userValidation";
import { storeFileInMemory } from "../../helpers/filehelper";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = express.Router();

// Register route
//todo add middleware for check user is valid role or not
router.post(
  "/create",
  storeFileInMemory.single("profilePic"),
  handleValidationErrors(createUserSchema),
  createUser
);
router.post("/register", handleValidationErrors(registerSchema), registerUser);
router.patch(
  "/update/:userId",
  authMiddleware,
  storeFileInMemory.single("profilePic"),
  updateUser
);
router.delete("/delete/:userId", authMiddleware, deleteUserById);

router.get("/users", authMiddleware, getAllUsers);

// get all users with pending profilePic
router.get("/pendingUsers", authMiddleware, getAllUserPendingProfilePic);

// patch user profile pic status
router.patch(
  "/profilePicStatus/:userId",
  authMiddleware,
  handleValidationErrors(profilePicApprovalSchema),
  updateUserProfilePic
);
// Verify email route
router.get("/verify-email", verifyEmail);

// Login route
router.post("/login", handleValidationErrors(loginSchema), loginUser);

// Apple Register route
router.post("/apple-register", appleRegister);

// Apple Login route
router.post("/apple-login", appleLogin);

// Forgot Password route
router.post("/forgot-password", forgotPassword);

// Check reset password token validity
router.get("/password-email-verify", checkTokenValidity);

// Reset Password route
router.post("/reset-password", resetPassword);

router.post("/google-auth-login", googleOauthLogin);
router.post("/google-auth-register", googleOauthRegister);

export default router;
