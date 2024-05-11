import { NextFunction, Request, Response } from "express";
import { User } from "../../models/User/user.model";

export const userProfile = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const userId = req.user._id;
    console.log('userId',userId)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: false, msg: "User not found" });
    }
    const {password,...userProfile} = user.toObject()
    res.status(200).json({ status: true, user:userProfile,msg:'User Profile fetched successfully!' });
  } catch (error: any) {
    next(error)
  }
}