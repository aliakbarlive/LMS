import mongoose, { Schema } from "mongoose";
import { ICourse } from "../../types/courseTypes";

const courseSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    topic: { type: String, required: true },
    duration: { type: String, required: true },
    modality: { type: String, required: true },
    isPublished: { type: Boolean, default: false, index: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    access: { type: [mongoose.Types.ObjectId], ref: "ICreateUser", index: true },
    createdBy: { type: mongoose.Types.ObjectId, ref: "ICreateUser", required: true },
    isCreatedByMe: { type: Boolean, default: false, index: true },
    postTitle: { type: String, required: false },
    videoUrl: { type: String, required: false },
    objectivesTitle: { type: String, required: false },
    courseOverview: { type: String, required: false },
    feedback: { type: [mongoose.Types.ObjectId], ref: "Feedback", index: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true, versionKey: false }
);

courseSchema.index({ createdBy: 1 });
courseSchema.index({ access: 1 });
courseSchema.index({ isPublished: 1 });
const Course = mongoose.model<ICourse>("Course", courseSchema);

export default Course;
