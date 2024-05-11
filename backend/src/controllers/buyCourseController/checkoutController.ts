import { Request, Response } from "express";
import CartItem from "../../models/Cart/cartItemModel";
import Order from "../../models/Order/OrderModel";

export const checkoutDetail = async (req: Request, res: Response) => {
  const userId = String(req.user._id);
  // Find the user's cart items
  const cartItems = await CartItem.find({ user: userId }).populate("course");

  // Check if the cart is empty
  if (cartItems.length === 0) {
    return res
      .status(400)
      .json({ error: "Cart is empty. Add items to the cart before checkout." });
  }

  // Calculate subtotal and total amount, handling cases where price is not available
  const subtotal = cartItems.reduce((total, item) => {
    const itemPrice = item?.course?.price || 0; // If price is undefined, set to zero
    return total + itemPrice * item.quantity;
  }, 0);

  const totalAmount = subtotal; // You can add additional components like taxes or shipping costs here

  res.json({
    cartItems,
    subtotal,
    totalAmount,
  });
};

export const proceedOrder = async (req: Request, res: Response) => {
  const userId = String(req.user._id);

  // Find the user's cart items
  const cartItems = await CartItem.find({ user: userId }).populate("course");

  if (cartItems.length === 0) {
    return res
      .status(400)
      .json({ error: "Cart is empty. Add items to the cart before checkout." });
  }

  // Calculate total amount, handling cases where price is not available
  const totalAmount = cartItems.reduce((total, item) => {
    const itemPrice = item.course.price || 0; // If price is undefined, set to zero
    return total + itemPrice * item.quantity;
  }, 0);

  // Create an order
  const order = new Order({
    user: userId,
    items: cartItems.map((item) => ({
      course: item.course._id,
      quantity: item.quantity,
    })),
    totalAmount,
    paymentStatus: "Pending",
  });

  await order.save();

  // Clear the user's cart after creating the order
  await CartItem.deleteMany({ user: userId });

  res.json({ order, message: "Checkout successful." });
};
