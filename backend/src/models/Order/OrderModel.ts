// models/Order.ts
import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../../types/userTypes";

export interface IOrder extends Document {
  user: IUser["_id"];
  items: Array<{ course: string; quantity: number }>;
  totalAmount: number;
  paymentStatus: string;
}

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
