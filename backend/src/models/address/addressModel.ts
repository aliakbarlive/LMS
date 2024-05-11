// models/Address.ts
import mongoose, { Schema } from "mongoose";
import { IUser } from "../../types/userTypes";

export interface IAddress {
  type: string; // 'Shipping' or 'Billing'
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  user: IUser["_id"];
}

const addressSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["Shipping", "Billing"],
      default: "Billing",
    },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  { timestamps: true }
);

const Address = mongoose.model<IAddress>("Address", addressSchema);

export default Address;
