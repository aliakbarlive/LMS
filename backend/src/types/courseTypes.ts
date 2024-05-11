import { Document } from "mongoose";
import { IUser } from "./userTypes";
import { IFeedback } from "./feedbackTypes";

export interface ICourse extends Document {
  title: string;
  topic: string;
  price: number;
  isPublished: boolean;
  access: string[];
  image: string;
  duration: string;
  modality: string;
  postTitle: string;
  videoUrl: string;
  objectivesTitle: string;
  courseOverview: string;
  isCreatedByMe: boolean;
  createdBy: IUser;
  feedback: IFeedback[];
}
