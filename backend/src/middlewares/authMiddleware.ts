import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../types/userTypes";
import { CreateUser, User } from "../models/User/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.header("Authorization")?.split(" ")[1] ||
    req.header("token")?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ status: false, msg: "Authorization denied. No token provided" });
  }
  try {

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = await CreateUser.findById(decoded.userId);
    // console.log("user", user);
    if (!user || user._id.toString() !== decoded.userId) {
      return res
        .status(401)
        .json({ status: false, msg: "Unauthorized access" });
    }

    (req as any).user = user;
    next();
  } catch (error: any) {
    res.status(401).json({ status: false, msg: "Token is not valid" });
  }
};
