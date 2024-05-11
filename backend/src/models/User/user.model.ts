import mongoose, { Schema, Document } from "mongoose";
import {
  ICreateUser,
  IInstructor,
  IOrganization,
  IUser,
} from "../../types/userTypes";
import { phoneSchemaValidation } from "../../validations/userValidation";

// Define schemas
const instructorSchema: Schema = new Schema<IInstructor>(
  {
    experience: [{ type: String, required: true }],
    skills: [{ type: String, required: true }],
  },
  { timestamps: true }
);

const organizationSchema: Schema = new Schema<IOrganization>(
  {
    expertise: [{ type: String, required: true }],
    orgBackground: { type: String, required: true },
  },
  { timestamps: true }
);

const userSchema: Schema<IUser> = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePic: { type: String, required: false },
  phone: { type: String, required: true },
  courseCount: { type: Number, required: false, default: 0 },
  user_type: {
    type: String,
    enum: ["Student", "Instructor", "Organization"],
    required: true,
  },

  userTypeData: { type: Schema.Types.Mixed, default: null },
  password: { type: String, required: true, private: true },
  verification_token: { type: String },
  verification_token_expires: { type: Date },
  is_verified: { type: Boolean, default: false },
  role: { type: String, required: true },
});

const createUserSchema: Schema<ICreateUser> = new Schema<ICreateUser>(
  {
    userName: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profilePic: { type: String, required: false },
    profilePicStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
    password: { type: String, required: true, private: true },
    is_verified: { type: Boolean, default: true },
    role: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model<IUser>("User", userSchema);
const CreateUser = mongoose.model<ICreateUser>("ICreateUser", createUserSchema);

userSchema.pre("save", function (next) {
  const phone = this.phone;
  phoneSchemaValidation
    .validate(phone)
    .then((validPhone) => {
      if (!validPhone) {
        throw new Error("Invalid phone number");
      }
      next(); // Continue with the save operation if phone is valid
    })
    .catch((error) => {
      next(new Error("Phone validation failed: " + error.message)); // Prevent saving if phone is not valid
    });
});

export { User, CreateUser };
