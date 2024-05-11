import express from "express";
const router = express.Router();

import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import courseRoutes from "./courseRoutes/courseRoutes";
import certificateRoutes from "./CertificateRoute/certificateRoute";
import cartRoutes from "./cartRoutes/cartRoutes";
import checkoutRoutes from "./checkoutRoutes/checkoutRoutes";
import addressRoutes from "./address/addressRoutes";
import orderRoutes from "./Order/orderRoutes";
import articleRoutes from "./articleRoutes/index";
import categoryRoutes from "./categoryRoutes/index";
import subscription from "./subscription";

router.use("/articles", articleRoutes);
router.use("/categories", categoryRoutes);
// Auth Routes
router.use("/auth", authRoutes);
// User Routes
router.use("/users", userRoutes);
// Course Routes
router.use("/course", courseRoutes);

// certificate routes
router.use("/certificate", certificateRoutes);

// cart Routes
router.use("/cart", cartRoutes);

// checkout routes
router.use("/checkout", checkoutRoutes);

// subscription routes
router.use("/subscribe", subscription);

// Address Routes
router.use("/address", addressRoutes);

// Order Routes
router.use("/order", orderRoutes);

export default router;
