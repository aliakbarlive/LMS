import express from "express";
import {
  allCourseWithPagination,
  createCourse,
  getCourses,
  getCourseById,
  updateCourseById,
  updateCoursePublish,
  courseFeedback,
  getCourseFeedbacks,
  coursePayment,
  courseEnrollment,
  getAllpendingCourses,
} from "../../controllers/courses/coursesConttroller";
import { relateCourse } from "../../controllers/courses/relatedCourseController";
import { storeFileInMemory, upload } from "../../helpers/filehelper";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { handleValidationErrors } from "../../validations/validationErrorhandler";
import {
  feedbackValidation,
  querySchema,
} from "../../validations/courseValidation";
import { validateEnrollmentData } from "../../middlewares/validateEnrollment";

const router = express.Router();

router.get("/all", allCourseWithPagination);

// Get all course
router.get("/", authMiddleware, getCourses);
router.get("/pendingCourses", authMiddleware, getAllpendingCourses);

// Add new Course
router.post(
  "/",
  authMiddleware,
  storeFileInMemory.single("image"),
  createCourse
);

// Get course by id
router.get("/:id", authMiddleware, getCourseById);

// updated course by id
router.patch(
  "/:courseId",
  authMiddleware,
  storeFileInMemory.single("image"),
  updateCourseById
);
// publish and unpublish the course
router.put(
  "/:courseId",
  authMiddleware,
  handleValidationErrors(querySchema),
  updateCoursePublish
);

router.post(
  "/:courseId/feedback",
  authMiddleware,
  handleValidationErrors(feedbackValidation),
  courseFeedback
);

router.get("/:courseId/feedback", authMiddleware, getCourseFeedbacks);

router.get("/:courseId/pay", authMiddleware, coursePayment);
router.get(
  "/:courseId/enroll",
  authMiddleware,
  validateEnrollmentData,
  courseEnrollment
);

router.get("/related/:courseId", authMiddleware, relateCourse);

export default router;
