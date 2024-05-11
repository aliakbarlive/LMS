import { Request, Response } from "express";
import Order from "../../models/Order/OrderModel";

const userTestId = "6593beaac2d7ee67a75fb248";

export const getOrders = async (req: Request, res: Response) => {
  // const { userId } = req;
  const userId = userTestId;
  // Find the user's orders
  const orders = await Order.find({ user: userId }).sort({ createdAt: "desc" });

  res.json({ orders });
};

export const getOrderById = async (req: Request, res: Response) => {
  // const { userId } = req;
  const userId = userTestId;
  const { orderId } = req.params;

  // Find the user's order by orderId
  const order = await Order.findOne({ _id: orderId, user: userId });

  if (!order) {
    return res.status(404).json({ error: "Order not found." });
  }

  res.json({ order });
};

export const deleteOrder = async (req: Request, res: Response) => {
  // const { userId } = req;
  const userId = userTestId;

  const { orderId } = req.params;

  // Find and delete the user's order by orderId
  const deletedOrder = await Order.findOneAndDelete({
    _id: orderId,
    user: userId,
  });

  if (!deletedOrder) {
    return res.status(404).json({ error: "Order not found." });
  }

  res.json({ message: "Order deleted successfully." });
};
