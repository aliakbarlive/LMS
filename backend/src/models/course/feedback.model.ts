import mongoose, { Schema } from "mongoose";
import { IFeedback } from "../../types/feedbackTypes";

const feedbackSchema = new Schema(
  {
    rating: { type: Number, required: true, default: 0 },
    comment: { type: String, required: true, default: "" },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  },
  { timestamps: true }
);

const Feedback = mongoose.model<IFeedback>("Feedback", feedbackSchema);

export { Feedback };
