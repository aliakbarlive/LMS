// models/article.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface Article extends Document {
  title: string;
  meta_title: string;
  meta_description: string
  content: string;
  cover_image: string;
  filePath: string;
  cover_image_credit: string;
  category: mongoose.Types.ObjectId; // Assuming you have a reference to categories
  author: mongoose.Types.ObjectId;
  starred?: boolean;
  update_time?: string;
  created_by?: string;
  time_to_read?: number;
  view_count?: number;
}

const articleSchema = new Schema<Article>(
  {
    title: { type: String, required: true },
    meta_title: { type: String, required: true },
    meta_description: { type: String, required: true },
    content: { type: String, required: true },
    cover_image: { type: String, required: false },
    cover_image_credit: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }, // Adjust 'Category' based on your category model name
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    starred: { type: Boolean, default: false },
    update_time: { type: String },
    created_by: { type: String },
    time_to_read: { type: Number },
    view_count: { type: Number },
    filePath: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

const ArticleModel = mongoose.model<Article>('Article', articleSchema);

export default ArticleModel;
