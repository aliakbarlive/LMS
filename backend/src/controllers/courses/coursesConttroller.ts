import { Request, Response } from "express";
import courseValidation from "../../validations/courseValidation";
import Course from "../../models/course/courseModel";
import { ICourse } from "../../types/courseTypes";
import { findAndDelteS3File, uploadStreamToS3 } from "../../config/awsConfig";
import { Stream } from "stream";
import path from "path";
import { isValidObjectId } from "mongoose";
import { feedbackPopulate, userPopulate } from "../../config/courseContant";
import { enrollInCourse, getCourseCountByUser } from "../../services";
import { Feedback } from "../../models/course/feedback.model";
import Stripe from "stripe";
const stripe = new Stripe("YOUR_STRIPE_API_KEY");

export const createCourse = async (req: Request, res: Response) => {
  const { body, user, file } = req;
  const { _id, name, role, email } = user;
  const createdBy = { _id, name, role, email };
  const userId = String(_id);
  const userTypes = [
    "Instructor",
    "super admin",
    "Organization",
    "admin",
    "manager",
    "company",
  ];

  try {
    if (!isValidObjectId(String(req.user._id))) {
      res.status(400).json({ message: "User id is required to get courses" });
    }
    if (!userTypes.includes(user.role)) {
      res.status(400).json({
        status: false,
        message: "You are not authorized to create course",
      });
    }

    // Set the course limit based on the user's subscription type todos
    // const courseLimit = userType === 'paid' ? 20 : 10;

    // Check if instructor has already created the maximum number of courses in the past month
    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
    const courseCount = await getCourseCountByUser(userId);
    if (courseCount >= 5) {
      return res.status(400).json({
        message: `you have reached the maximum number of course created in free tier`,
      });
    }
    if (!file) {
      return res.status(400).json({
        status: false,
        message: "No file uploaded",
      });
    }

    const fileBuffer = file.buffer;
    const fileStream = new Stream.PassThrough();
    fileStream.end(fileBuffer);
    const fileName = file.originalname;
    const contentType = file.mimetype;
    const fileUrl = await uploadStreamToS3(
      fileStream,
      "course",
      fileName,
      contentType
    );

    await courseValidation.validate(body, { abortEarly: false });
    Object.assign(body, {
      image: fileUrl,
      access: [userId],
      createdBy,
    });
    const createdCourse = await Course.create({
      ...body,
    });
    await createdCourse.populate(userPopulate);
    res.status(201).json({
      status: true,
      message: "Course created successfully",
      data: createdCourse,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: "Course not created: " + error,
    });
  }
};

export const updateCourseById = async (req: Request, res: Response) => {
  const courseId = String(req.params.courseId);
  const { file, user } = req;
  const userId = String(user._id);

  try {
    const course: ICourse | null = await Course.findById(courseId).populate(
      userPopulate
    );
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    const isCreator = String(course.createdBy._id) === userId;
    if (!isCreator) {
      return res
        .status(400)
        .json({ error: "You don't have permission to update this course" });
    }

    const {
      title,
      topic,
      price,
      duration,
      modality,
      postTitle,
      videoUrl,
      objectivesTitle,
      courseOverview,
    } = req.body;

    // Update the course fields based on the values from the request body
    const updatedFields: any = {
      title,
      topic,
      price,
      duration,
      modality,
      postTitle,
      videoUrl,
      objectivesTitle,
      courseOverview,
    };
    if (file) {
      const fileToDel = path.basename(String(course.image));
      const fileBuffer = file.buffer;
      const fileStream = new Stream.PassThrough();
      fileStream.end(fileBuffer);
      const fileName = file.originalname;
      const contentType = file.mimetype;
      const [fileDeleted, fileUrl] = await Promise.all([
        findAndDelteS3File(fileToDel),
        uploadStreamToS3(fileStream, "course", fileName, contentType),
      ]);
      updatedFields.image = fileUrl;
    }
    Object.keys(updatedFields).forEach((key) => {
      if (updatedFields[key] && course) {
        (course as { [key: string]: any })[key] = updatedFields[key];
      }
    });
    const updatedCourse = await course.save();
    res.status(200).json(updatedCourse);
  } catch (err: any) {
    console.error("course not updated>>>", err);
  }
};

export const updateCoursePublish = async (req: Request, res: Response) => {
  const { params, user, body } = req;
  const courseId = String(params.courseId);
  const userId = String(user._id);
  const isPublished = body.isPublished === true;

  try {
    if (!isValidObjectId(userId)) {
      res.status(400).json({ message: "User id is required to get courses" });
    }
    const course = await Course.findByIdAndUpdate(
      courseId,
      { isPublished },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    if (String(course.createdBy) !== userId) {
      return res
        .status(404)
        .json({ message: "you are not authorized to perform this action" });
    }
    res
      .status(200)
      .json({ courseId: course._id, isPublished: course.isPublished });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to updated courses publish status",
    });
  }
};

export const getCourses = async (req: Request, res: Response) => {
  try {
    if (!isValidObjectId(String(req.user._id))) {
      res.status(400).json({ message: "User id is required to get courses" });
    }
    const userId = String(req.user._id);
    const courses = await Course.find({})
      .sort({ createdAt: -1 })
      .populate(userPopulate)
      .populate(feedbackPopulate);
    res.status(200).send({ courses });
  } catch (err: any) {
    console.error("Failed to get courses", err);
    res.status(500).json({
      status: false,
      message: "Failed to get courses",
    });
  }
};
export const getAllpendingCourses = async (req: Request, res: Response) => {
  try {
    if (!isValidObjectId(String(req.user._id))) {
      res.status(400).json({ message: "User id is required to get courses" });
    }

    const courses = await Course.find({ status: "pending" })
      .sort({ createdAt: -1 })
      .populate(userPopulate)
      .populate(feedbackPopulate);
    res.status(200).send({ courses });
  } catch (err: any) {
    console.error("Failed to get courses", err);
    res.status(500).json({
      status: false,
      message: "Failed to get courses",
    });
  }
};
export const courseFeedback = async (req: Request, res: Response) => {
  const { params, user, body } = req;
  const courseId = String(params.courseId);
  const userId = String(user._id);
  try {
    if (!isValidObjectId(userId)) {
      res.status(400).json({ message: "User id is required to get courses" });
    }

    const course: any = await Course.findById({ _id: courseId });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const feedback = await Feedback.create({
      rating: body.rating,
      comment: body.comment,
      courseId,
    });
    course.feedback.push(feedback);
    await course.save();
    res.status(200).json({ feedback });
  } catch (err: any) {
    console.error("Failed to update course feedback", err);
    res.status(500).json({
      status: false,
      message: "Failed to create feedback",
    });
  }
};
export const getCourseFeedbacks = async (req: Request, res: Response) => {
  const { params, user, body } = req;
  const courseId = String(params.courseId);
  const userId = String(user._id);
  try {
    if (!isValidObjectId(userId)) {
      res.status(400).json({ message: "User id is required to get courses" });
    }

    const course = await Course.findById(courseId)
      .populate(userPopulate)
      .populate(feedbackPopulate);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json({ allCourseFeedback: course.feedback });
  } catch (err: any) {
    console.error("Failed to update course feedback", err);
    res.status(500).json({
      status: false,
      message: "Failed to create feedback",
    });
  }
};

const getCourseOverallRating = async (courseId: string) => {
  let feedbacks = [
    { userId: "user1", rating: 4 },
    { userId: "user2", rating: 5 },
    { userId: "user3", rating: 3 },
  ];

  let totalRating = 0;
  let totalUsers = feedbacks.length;

  for (let i = 0; i < totalUsers; i++) {
    totalRating += feedbacks[i].rating;
  }
  let averageRating = totalRating / totalUsers;
  // console.log(`The overall rating is ${averageRating}`);
};

export const coursePayment = async (req: Request, res: Response) => {
  const { params, user, body } = req;
  const courseId = String(params.courseId);
  const userId = String(user._id);
  try {
    if (!isValidObjectId(userId)) {
      res.status(400).json({ message: "User id is required to get courses" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    const { token, amount, description } = req.body;
    const charge = await stripe.charges.create({
      amount: amount, // Amount in cents
      currency: "usd",
      description: description,
      source: token,
    });

    // course.isEnrolled = true;
    // Save the updated course document
    await course.save();

    res.status(200).json({ message: "Payment successful", charge: charge });
  } catch (err: any) {
    console.error("Failed to update course feedback", err);
    res.status(500).json({
      status: false,
      message: "Failed to create feedback",
    });
  }
};
export const courseEnrollment = async (req: Request, res: Response) => {
  const { params, user, body } = req;
  const courseId = String(params.courseId);
  const userId = String(user._id);
  const { token, amount, description } = req.body;
  try {
    await enrollInCourse(courseId, userId, token, amount, description);
    res.status(200).json({ message: "Enrollment successful" });
  } catch (error) {
    console.error("Failed to enroll in the course", error);
    res.status(500).json({
      status: false,
      message: "Failed to enroll in the course",
    });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  const courseId = req.params.id;
  // Use Mongoose to find the course by ID
  const course = await Course.findById(courseId).populate(userPopulate);
  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }
  res.status(200).json({ course });
};

export const allCourseWithPagination = async (req: Request, res: Response) => {
  const page: number = parseInt(req.query.page as string) || 1;
  const limit: number = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  const [courses, totalItems] = await Promise.all([
    Course.find().skip(skip).limit(limit),
    Course.countDocuments(),
  ]);

  const totalPages = Math.ceil(totalItems / limit);

  res.json({
    data: courses,
    pagination: {
      totalItems,
      totalPages,
      currentPage: page,
      itemsPerPage: limit,
    },
  });
};
