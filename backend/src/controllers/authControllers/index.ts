import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  appleLoginSchema,
  appleRegisterSchema,
  forgotPasswordSchema,
  googleLoginSchema,
  googleRegisterSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "../../validations/userValidation";
import {
  generateResetPasswordToken,
  generateVerificationToken,
} from "../../utils/tokenUtils";
import {
  sendResetPasswordEmail,
  sendVerificationEmail,
} from "../../utils/emailUtils";
import ResetToken from "../../models/User/resetToken";
import { decodeAppleToken, extractNameFromEmail } from "../../utils/helpers";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import { CreateUser, User } from "../../models/User/user.model";
import { IUser } from "../../types/userTypes";
import { getCourseCountByUser } from "../../services";
import { Stream } from "stream";
import { findAndDelteS3File, uploadStreamToS3 } from "../../config/awsConfig";
import path from "path";
import { allroles } from "../../config/courseContant";
import { isValidObjectId } from "mongoose";

// Load environment variables from a .env file
const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_EXPIRY = process.env.JWT_EXPIRY || "";

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
  const { email, password, countryCode, phone, user_type, ...userData } =
    req.body;
  // console.log("userData", req.body);
  try {
    // Check if the email already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ status: false, msg: "Email is already registered" });
    }

    // Generate a verification token and set expiration time (e.g., 1 day from now)
    const token = generateVerificationToken();
    const tokenExpireIn = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Save the user with the verification token
    const hashedPassword = await bcrypt.hash(password, 10);
    const phoneNumber = countryCode + phone;
    const user = new User({
      ...req.body,
      phone: phoneNumber,
      password: hashedPassword,
      verification_token: token,
      verification_token_expires: tokenExpireIn,
    });

    // Send the verification email
    // await sendVerificationEmail(email, verificationToken);
    await user.save();

    res.json({
      status: true,
      // msg: "You have been registered successfully! Check your email and verify.",
      msg: "You have been registered successfully!",
    });
  } catch (err: any) {
    console.error("user not registered error : ", err);
    res.status(500).json({ status: false, msg: "failed to registered user" });
  }
};
export const createUser = async (req: Request, res: Response) => {
  const { body, file } = req;
  const { email, userName, role, password } = body;
  try {
    if (!allroles.includes(role.toLowerCase())) {
      return res.status(400).json({
        status: false,
        message: "Invalid user role",
      });
    }
    // Check if the email already exist
    const existingUser = await CreateUser.findOne({
      $and: [{ email: email }, { userName: userName }],
    });
    if (existingUser) {
      return res
        .status(409)
        .json({ status: false, msg: "Email or username is already exist" });
    }
    let profilePic = "";
    if (file) {
      const fileBuffer = file.buffer;
      const fileStream = new Stream.PassThrough();
      fileStream.end(fileBuffer);
      const fileName = file.originalname;
      const contentType = file.mimetype;
      profilePic = await uploadStreamToS3(
        fileStream,
        "auth",
        fileName,
        contentType
      );
    }
    // Generate a verification token and set expiration time (e.g., 1 day from now)
    const token = generateVerificationToken();
    const tokenExpireIn = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Save the user with the verification token
    const hashedPassword = await bcrypt.hash(password, 10);
    Object.assign(body, {
      profilePic,
      password: hashedPassword,
      verification_token: token,
      verification_token_expires: tokenExpireIn,
    });
    // todo not select password in response
    const user = await CreateUser.create(req.body);
    // converting a Mongoose document into a plain JavaScript object,
    // including any getters defined in the schema, but excluding any virtuals
    const userlocal = user.toObject({
      getters: true,
      virtuals: false,
    });

    res.json({
      status: true,
      msg: "user craeted successfully!",
      user: userlocal,
    });
  } catch (err: any) {
    console.error("user not registered error : ", err);
    res.status(500).json({ status: false, msg: "failed to registered user" });
  }
};

export const getAllUserPendingProfilePic = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await CreateUser.find({ profilePicStatus: "pending" }).select(
      "-password"
    );
    if (!users) {
      res.status(400).json({ status: false, msg: "users not found" });
    }
    res.status(200).json({
      status: true,
      msg: "show all pending profilepic users",
      pendingUsers: users,
    });
  } catch (error) {
    console.error("pending profilepic users not found : ", error);
    res.status(500).json({ status: false, msg: "failed to get pending users" });
  }
};

// update user profile pic pending status
export const updateUserProfilePic = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const { profilePicStatus } = req.body;
  if (!isValidObjectId(String(req.user._id))) {
    res.status(400).json({ message: "User id is not valid" });
  }
  if (!userId) {
    return res.status(400).json({ status: false, msg: "userId is required" });
  }
  try {
    const user = await CreateUser.findById(userId);
    if (!user) {
      return res.status(404).json({ status: false, msg: "User not found" });
    }
    if (user.profilePicStatus === "approved") {
      return res
        .status(400)
        .json({ status: false, msg: "User is already approved" });
    }
    const updatedUser = await CreateUser.findByIdAndUpdate(
      { _id: userId },
      { profilePicStatus },
      { new: true }
    ).select("-password -verification_token -verification_token_expires");
    if (!updatedUser) {
      return res.status(404).json({ status: false, msg: "User not found" });
    }
    res
      .status(200)
      .json({ status: true, msg: "User updated successfully", updatedUser });
  } catch (err: any) {
    console.error("user not updated error : ", err);
    res.status(500).json({ status: false, msg: "failed to update user" });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  console.log("userId", userId, req.user.role);
  // todo delete the profile pic from s3

  // if (req.user.role !== "student") {
  //   return res.status(401).json({ status: false, msg: "you are not authorized to perform this action" });
  // }
  if (!isValidObjectId(String(userId))) {
    res.status(400).json({ message: "User id is not valid" });
  }
  if (!userId) {
    return res.status(400).json({ status: false, msg: "userId is required" });
  }

  try {
    const deletedUser = await CreateUser.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ status: false, msg: "User not found" });
    }
    res.status(200).json({ status: true, msg: "User deleted successfully" });
  } catch (err: any) {
    console.error("user not deleted error : ", err);
    res.status(500).json({ status: false, msg: "failed to delete user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { body, file } = req;
  const { userName, firstName, lastName, role } = body;
  const userId = req.params.userId;
  if (!allroles.includes(role.toLowerCase())) {
    return res.status(400).json({
      status: false,
      message: "Invalid user role",
    });
  }
  try {
    // Check if the email already exist
    const user = await CreateUser.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ status: false, msg: "User not found" });
    }

    let profilePic = "";
    if (file) {
      const fileToDel = path.basename(String(user.profilePic));
      const fileBuffer = file.buffer;
      const fileStream = new Stream.PassThrough();
      fileStream.end(fileBuffer);
      const fileName = file.originalname;
      const contentType = file.mimetype;
      const [fileDeleted, fileUrl] = await Promise.all([
        findAndDelteS3File(fileToDel),
        uploadStreamToS3(fileStream, "auth", fileName, contentType),
      ]);
      profilePic = fileUrl;
    }

    const updatedUser = Object.assign(user, {
      ...(userName && { userName }),
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(role && { role }),
      ...(profilePic && { profilePic }),
    });
    await user.save();
    res.json({
      status: true,
      msg: "user updated successfully!",
      user: updatedUser,
    });
  } catch (err: any) {
    console.error("user not updated error : ", err);
    res.status(500).json({ status: false, msg: "failed to update user" });
  }
};
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Check if the email already exist
    const allUsers = await CreateUser.find().select("-password");
    if (!allUsers) {
      return res.status(409).json({ status: false, msg: "user not found!" });
    }
    res.status(200).json({ status: true, users: allUsers });
  } catch (err: any) {
    console.error("users not found error : ", err);
    res.status(500).json({ status: false, msg: "failed to get users" });
  }
};

// Login a user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // Check if the user exists
    const user = await CreateUser.findOne({
      $or: [{ email }, { userName: email }],
    });
    if (!user) {
      return res
        .status(403)
        .json({ status: false, msg: "Invalid email or password test " });
    }
    const passwordMatch = await bcrypt.compare(password, user.password || "");
    if (!passwordMatch) {
      return res.status(403).json({ status: false, msg: "Invalid password" });
    }

    // Generate JWT token for successful login
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRY,
    });
    // const courseCount = await getCourseCountByUser(user._id);
    // Object.assign(user, { courseCount });
    const userWithoutPassword = {
      _id: user._id,
      email: user.email,
      token: "Bearer " + token,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePic: user.profilePic,
      role: user.role,
    };
    res.json({
      status: true,
      msg: "You have successfully logged in!",
      user: userWithoutPassword,
    });
  } catch (err: any) {
    console.error("Authentication error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Verify a user's email
export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({
      status: false,
      msg: "Token is required for email verification",
    });
  }

  // Find the user with the provided verification token
  const user = await User.findOne({ verification_token: token });

  if (!user) {
    return res
      .status(404)
      .json({ status: false, msg: "Invalid verification token" });
  }

  // Update the user's status to 'verified' and clear the verification token
  user.is_verified = true;
  user.verification_token = undefined;
  await user.save();

  res
    .status(200)
    .json({ status: true, msg: "Email verification success full!" });
};
// Apple Login
export const appleLogin = async (req: Request, res: Response) => {
  await appleLoginSchema.validate(req.body, { abortEarly: false });
  const { id_token } = req.body;

  // Decode Apple ID token and extract user information
  const userInfo = decodeAppleToken(id_token);

  if (!userInfo) {
    return res.status(400).json({
      status: false,
      msg: "Invalid Apple ID token",
    });
  }

  const { email, name } = userInfo;

  if (!email) {
    return res
      .status(400)
      .json({ status: false, msg: "Please provide email." });
  }
  // Check if the user exists
  let user = await User.findOne({ email });

  if (!user) {
    return res
      .status(400)
      .json({ status: false, msg: "User not found. Please register first." });
  }
  user.name = name || extractNameFromEmail(email);
  await user.save();
  // Generate JWT token for successful login
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });

  res.json({
    status: true,
    token: "Bearer " + token,
    msg: "You have successfully logged in!",
  });
};

// Apple Register
export const appleRegister = async (req: Request, res: Response) => {
  await appleRegisterSchema.validate(req.body, { abortEarly: false });
  const { id_token, user_type } = req.body;

  // Decode Apple ID token and extract user information
  const userInfo = decodeAppleToken(id_token);

  if (!userInfo) {
    return res.status(400).json({
      status: false,
      msg: "Invalid Apple ID token",
    });
  }

  const { email, name } = userInfo;
  if (!email) {
    return res
      .status(400)
      .json({ status: false, msg: "Please provide email." });
  }
  // Check if the user exists
  let user = await User.findOne({ email });

  if (!user) {
    // Handle registration logic for Apple user
    user = new User({ email, user_type: user_type, is_verified: true });
    user.name = name || extractNameFromEmail(email);
    await user.save();
  }

  // Generate JWT token for successful registration
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });

  res.json({
    status: true,
    token: "Bearer " + token,
    msg: "You have successfully registered!",
  });
};

// Forgot Password
export const forgotPassword = async (req: Request, res: Response) => {
  await forgotPasswordSchema.validate(req.body, { abortEarly: false });
  const { email } = req.body;

  // Find the user with the provided email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      status: false,
      msg: "User not found with the provided email",
    });
  }

  // Generate a reset password token and set expiration time (e.g., 1 hour from now)
  const resetPasswordToken = generateResetPasswordToken();
  const resetPasswordTokenExpires = new Date(Date.now() + 1 * 60 * 60 * 1000);

  // Save the reset password token to the database
  const resetToken = new ResetToken({
    user: user._id,
    token: resetPasswordToken,
    expires_at: resetPasswordTokenExpires,
  });
  await resetToken.save();

  // Send the reset password email
  await sendResetPasswordEmail(email, resetPasswordToken);

  res.json({
    status: true,
    msg: "Reset password email sent. Check your email for instructions.",
  });
};
// Check Reset Token Validity
export const checkTokenValidity = async (req: Request, res: Response) => {
  const { token } = req.query;
  // Find the reset token in the database
  const resetToken = await ResetToken.findOne({
    token,
    expires_at: { $gt: new Date() },
  });

  if (!resetToken) {
    return res.status(400).json({
      status: false,
      msg: "Invalid or expired reset password token",
    });
  }

  // Token is valid, send success response
  res.json({ status: true, msg: "Token is valid" });
};

// Reset Password
export const resetPassword = async (req: Request, res: Response) => {
  await resetPasswordSchema.validate(req.body, { abortEarly: false });
  const { password, token } = req.body;
  // Find the reset token in the database
  const resetToken = await ResetToken.findOne({
    token,
    expires_at: { $gt: new Date() },
  });

  if (!resetToken) {
    return res.status(400).json({
      status: false,
      msg: "Invalid or expired reset password token",
    });
  }
  // Find the user associated with the reset token
  const user = await User.findById(resetToken.user);

  if (!user) {
    return res.status(404).json({ status: false, msg: "User not found" });
  }

  // Update the user's password and remove the reset token from the database
  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  await user.save();

  // Remove the reset token from the database using the deleteOne method
  await ResetToken.deleteOne({ _id: resetToken._id });
  res.json({ status: true, msg: "Password reset successfull!" });
};

// export const googleOauthRegister = async (req: Request, res: Response) => {
//   const { idToken } = req.body;

//   const userInfo = await client.verifyIdToken({
//     idToken: idToken!,
//     audience:
//       "988924154564-dogseot2bifafe00qi9p8h45druecug2.apps.googleusercontent.com",
//   });

//   // User Payload by idToken
//   const userPayload: TokenPayload | undefined = (userInfo as any).payload;

//   // Check payload and send token to user
//   if (userPayload) {
//     console.log("userPayload", userPayload.email);

//     // Find User to id already Exist
//     let user = await User.findOne({ email: userPayload.email });

//     // If Already user Exist
//     if (user) {
//       const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
//         expiresIn: JWT_EXPIRY,
//       });

//       return res.json({
//         status: true,
//         token: token,
//         msg: "You have successfully registered!",
//       });
//     }
//     // Add user to Database id already not exist in database
//     const newUser = await User.create({
//       name: userPayload.name,
//       email: userPayload.email,
//       is_verified: true,
//     });
//     console.log("newUser", newUser);
//     const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
//       expiresIn: JWT_EXPIRY,
//     });

//     return res.json({
//       status: true,
//       token: token,
//       msg: "You have successfully registered!",
//     });
//   } else {
//     res.status(400).json({ success: false, error: "Invalid user payload" });
//   }
// };

// export const googleOauthLogin = async (req: Request, res: Response) => {
//   const { idToken } = req.body;

//   const userInfo = await client.verifyIdToken({
//     idToken: idToken!,
//     audience:
//       "988924154564-dogseot2bifafe00qi9p8h45druecug2.apps.googleusercontent.com",
//   });

//   // User Payload by idToken
//   const userPayload: TokenPayload | undefined = (userInfo as any).payload;

//   // Check payload and send token to user
//   if (userPayload) {

//     // Find User to id already Exist
//     let user = await User.findOne({ email: userPayload.email });

//     // If Already user Exist send JWT Token
//     if (!user) {
//       return res
//         .status(403)
//         .json({ status: false, msg: "User not found. Please register first." });
//     }
//     // Add user to Database id already not exist in database

//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
//       expiresIn: JWT_EXPIRY,
//     });

//     return res.json({
//       status: true,
//       token: token,
//       msg: "You have successfully registered!",
//     });
//   } else {
//     res.status(400).json({ success: false, error: "Invalid user payload" });
//   }
// };

// Login with access-token
export const googleOauthLogin = async (req: Request, res: Response) => {
  const { access_token } = req.body;

  // Make a request to the Google API's userinfo endpoint using the access token
  const userInfoResponse = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  if (!userInfoResponse.ok) {
    return res
      .status(400)
      .json({ success: false, error: "Failed to fetch user info" });
  }

  const userPayload = await userInfoResponse.json();

  // Check if userPayload contains the necessary information
  if (userPayload.email) {
    // Find User if already exists
    let user = await User.findOne({ email: userPayload.email });

    // If user doesn't exist, send an error response
    if (!user) {
      return res
        .status(403)
        .json({ status: false, msg: "User not found. Please register first." });
    }

    // Generate JWT Token and send it to the user
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRY,
    });

    return res.json({
      status: true,
      token: token,
      msg: "You have successfully logged in!",
    });
  } else {
    return res
      .status(400)
      .json({ success: false, error: "Invalid user payload" });
  }
};

// Register with Access Token
export const googleOauthRegister = async (req: Request, res: Response) => {
  const { access_token } = req.body;

  // Make a request to the Google API's userinfo endpoint using the access token
  const userInfoResponse = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  if (!userInfoResponse.ok) {
    return res
      .status(400)
      .json({ success: false, error: "Failed to fetch user info" });
  }

  const userInfo = await userInfoResponse.json();

  // Check if userPayload contains the necessary information
  if (userInfo.email) {
    // Find User if already exists
    let user = await User.findOne({ email: userInfo.email });

    // If user already exists
    if (user) {
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRY,
      });

      return res.json({
        status: true,
        token: token,
        msg: "You have successfully registered!",
      });
    }

    // Add user to Database if not already in the database
    const newUser = await User.create({
      name: userInfo.name,
      email: userInfo.email,
      is_verified: true,
    });

    console.log("New User:", newUser);

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRY,
    });

    return res.json({
      status: true,
      token: token,
      msg: "You have successfully registered!",
    });
  } else {
    return res
      .status(400)
      .json({ success: false, error: "Invalid user payload" });
  }
};
