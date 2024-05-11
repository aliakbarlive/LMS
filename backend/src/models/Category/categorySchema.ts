// models/categoryModel.js
import mongoose, { Document, Schema } from 'mongoose';
import ArticleModel, { Article } from '../Article/articleModel';

export interface Category extends Document {
  label: string;
  value: string;
}

const categorySchema = new Schema<Category>(
  {
    label: { type: String, required: true,unique:true },
    value: { type: String, required: true, unique:true },
  },
  { timestamps: true }
);

categorySchema.virtual('articles', {
  ref: 'Article', // The name of the Article model
  localField: '_id',
  foreignField: 'category',
  justOne: false,
});

const CategoryModel = mongoose.model<Category>('Category', categorySchema);

export default CategoryModel;
