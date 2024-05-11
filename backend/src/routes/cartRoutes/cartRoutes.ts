import express from "express";
import {
  addToCard,
  clearCart,
  deleteCartItem,
  getCartItems,
  updateCartItem,
} from "../../controllers/buyCourseController/cartControlller";
const router = express.Router();

// Add item to Cart
router.post("/add", addToCard);

// Update Cart item
router.put("/update/:courseId", updateCartItem);

// Get Cart Item
router.get("/items", getCartItems);

// Delete Cart Item
router.delete("/delete/:id", deleteCartItem);

// Clear cart
router.delete("/clear", clearCart);

export default router;
