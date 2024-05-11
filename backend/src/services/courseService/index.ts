import Stripe from "stripe";
import Course from "../../models/course/courseModel";
const stripe = new Stripe("YOUR_STRIPE_API_KEY");

const enrollInCourse = async (
  courseId: string,
  userId: string,
  token: string,
  amount: number,
  description: string
) => {
  const course = await Course.findById(courseId);
  if (!course) {
    throw new Error("Course not found");
  }

  // Perform payment using Stripe API
  const charge = await stripe.charges.create({
    amount: amount,
    currency: "usd",
    description: description,
    source: token,
  });

  // Update course access and save
  course.access.push(userId);
  await course.save();
};
const getCourseCountByUser = async (userId: string) => {
  const courseCount = await Course.countDocuments({ createdBy: userId });
  return courseCount;
};

export { getCourseCountByUser, enrollInCourse };
