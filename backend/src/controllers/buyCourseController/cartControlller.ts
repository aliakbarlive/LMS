import { Request, Response } from "express";
import CartItem from "../../models/Cart/cartItemModel";
const userTestId = "6593beaac2d7ee67a75fb248";

// export const addToCard = async (req: Request, res: Response) => {
//   //   const { userId } = req;
//   const userId = userTestId;
//   const { courseId, quantity } = req.body;

//   // Check if the item already exists in the user's cart
//   let cartItem = await CartItem.findOne({ user: userId, course:courseId });

//   if (cartItem) {
//     // If the item exists, update the quantity
//     cartItem.quantity += quantity || 1;
//     await cartItem.save();
//   } else {
//     // If the item does not exist, create a new cart item
//     cartItem = new CartItem({ user: userId, course:courseId, quantity });
//     await cartItem.save();
//   }

//   res.json(cartItem);
// };
export const addToCard = async (req: Request, res: Response) => {
  // const { userId } = req;
  const userId = userTestId;
  const { courseId, quantity } = req.body;

  // Check if the item already exists in the user's cart
  let cartItem = await CartItem.findOne({ user: userId, course: courseId });

  if (cartItem) {
    // If the item exists, you can either update the quantity or respond accordingly
    // Here, we prevent adding another instance of the same course
    return res.status(400).json({ error: "Course already in the cart." });
  } else {
    // If the item does not exist, create a new cart item
    cartItem = new CartItem({ user: userId, course: courseId, quantity });
    await cartItem.save();
    res.json({success:true,message:"sucessfuly added"});
  }
};
export const updateCartItem = async (req: Request, res: Response) => {
  //   const { userId } = req;
  const userId = userTestId;
  const { courseId } = req.params;
  const { quantity } = req.body;

  let cartItem = await CartItem.findOne({ user: userId, courseId });

  if (cartItem) {
    // If the item exists, update the quantity
    cartItem.quantity = quantity || 1;
    await cartItem.save();
    res.json(cartItem);
  } else {
    res.status(404).json({ error: "Item not found in the cart." });
  }
};

export const getCartItems = async (req: Request, res: Response) => {
  //   const { userId } = req;
  const userId = userTestId;
  const cartItems = await CartItem.find({ user: userId })
    .populate("course")
    .sort({ createdAt: -1 });
  res.json(cartItems);
};

export const deleteCartItem = async (req: Request, res: Response) => {
  //   const { userId } = req;
  const userId = userTestId;
  const { id } = req.params;

  const result = await CartItem.findByIdAndDelete(id);

  if (result) {
    res.json({ message: "Item removed from the cart successfully." });
  } else {
    res.status(404).json({ error: "Item not found in the cart." });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  //   const { userId } = req;
  const userId = userTestId;
  await CartItem.deleteMany({ user: userId });
  res.json({ message: "User's cart cleared successfully." });
};
