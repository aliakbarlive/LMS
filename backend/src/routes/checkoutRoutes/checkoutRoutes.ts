import express from "express";
import {
  checkoutDetail,
  proceedOrder,
} from "../../controllers/buyCourseController/checkoutController";
const router = express.Router();

// Place a Order
router.get("/place-order", proceedOrder);

router.get("/checkout-details", checkoutDetail);

export default router;
