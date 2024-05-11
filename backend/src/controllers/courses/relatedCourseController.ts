import { Request, Response } from "express";
import Course from "../../models/course/courseModel";

export const relateCourse = async (req: Request, res: Response) => {
  const { courseId } = req.params;

  // Validate if the course ID parameter is provided
  if (!courseId) {
    return res.status(400).json({ error: "Course not found" });
  }

  // Find the course by ID to get its category
  const sourceCourse = await Course.findById(courseId);

  // Validate if the course with the provided ID exists
  if (!sourceCourse) {
    return res.status(404).json({ error: "Course not found." });
  }

  const { modality } = sourceCourse;

  // Determine the limit based on the optional 'limit' parameter or use default 10
  const limit = parseInt(req.query?.limit as string) || 10;

  // Construct the aggregation pipeline based on the 'random' parameter
  const aggregationPipeline: any[] = [
    { $match: { modality, _id: { $ne: courseId } } },
  ];

  if (req.query?.random === "true") {
    aggregationPipeline.push({ $sample: { size: limit } });
  } else {
    aggregationPipeline.push({ $limit: limit });
  }

  // Execute the aggregation query
  const relatedCourses = await Course.aggregate(aggregationPipeline).exec();

  res.json(relatedCourses);
};
