import mongoose from "mongoose";
const DATABASE_URI = process.env.DATABASE_URI || "";
const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URI)
    console.log("MongoDB Connected");
  } catch (err: any) {
    console.log("MongoDB Connection Error : ", err);
  }
};

export default connectDB;
