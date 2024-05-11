import mongoose, { Document, Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  user_type: "Student" | "Instructor" | "Organization";
  email: string;
  password: string;
  courseCount: number;
  profilePic?: string;
  phone?: string;
  userTypeData: IInstructor | IOrganization | null;
  verification_token?: string;
  verification_token_expires?: Date;
  is_verified?: boolean;
  role: string;
}
export interface ICreateUser extends Document {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePic?: string;
  is_verified?: boolean;
  profilePicStatus?: "pending" | "approved" | "rejected";
  role: string;
}

export interface IResetToken extends Document {
  user: Types.ObjectId;
  token: string;
  expires_at: Date;
}

export interface IInstructor {
  experience: string;
  skills: string[];
}

export interface IOrganization {
  orgBio: string;
  expertise: string[];
  orgBackground: string;
}
