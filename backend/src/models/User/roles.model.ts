import mongoose, { Document, Schema } from "mongoose";

export interface IRole extends Document {
  userName: string;
  permissions: string[];
}

const RoleSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  permissions: { type: [String], default: [] },
});

export default mongoose.model<IRole>("Role", RoleSchema);
