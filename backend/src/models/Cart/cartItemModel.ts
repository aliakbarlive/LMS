import mongoose, { Schema } from "mongoose";
import { IUser } from "../../types/userTypes";
import { ICourse } from "../../types/courseTypes";
export interface ICartItem extends Document {
  user: IUser['_id'];
  course: ICourse['_id'];
  quantity: number;
}
const cartItemSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);
const CartItem = mongoose.model<ICartItem>("CartItem", cartItemSchema);

export default CartItem;
