// services/articleService.ts
import ArticleModel, { Article } from "../../models/Article/articleModel";
import CategoryModel from "../../models/Category/categorySchema";

export default class ArticleService {
  static async getArticle(articleId: string): Promise<Article | null> {
    return ArticleModel.findById(articleId)
      .populate({
        path: "author",
        select: "name",
      })
      .exec();
  }

  static async getOthersArticleList(
    articleId: string
  ): Promise<{ relatedArticle: Article[]; popularArticle: Article[] }> {
    const article = await ArticleModel.findById(articleId)
      .populate({
        path: "author",
        select: "name",
      })
      .exec();
    if (!article) {
      return { relatedArticle: [], popularArticle: [] };
    }

    const category = await CategoryModel.findById(article.category).exec();
    if (!category) {
      return { relatedArticle: [], popularArticle: [] };
    }

    // Get related articles in the same category
    const relatedArticle = await ArticleModel.find({
      category: category._id,
      _id: { $ne: article._id },
    })
      .limit(3) // Adjust the limit as needed
      .exec();

    // Get popular articles (example: the latest 5 articles)
    const popularArticle = await ArticleModel.find({
      _id: { $ne: article._id },
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .exec();

    return { relatedArticle, popularArticle };
  }

  static async createArticle(articleData: any): Promise<Article> {
    const article = new ArticleModel(articleData);
    return article.save();
  }

  static async updateArticle(
    articleId: string,
    articleData: any
  ): Promise<Article | null> {
    return ArticleModel.findByIdAndUpdate(articleId, articleData, {
      new: true,
    }).exec();
  }

  static async deleteArticle(articleId: string): Promise<void> {
    await ArticleModel.findByIdAndDelete(articleId).exec();
  }

  static async getAllArticles(): Promise<Article[]> {
    return ArticleModel.find()
      .populate({
        path: "author",
        select: "name",
      })
      .exec();
  }

  static async getArticlesByCategory(categoryId: string): Promise<Article[]> {
    return ArticleModel.find({ category: categoryId })
      .populate({
        path: "author",
        select: "name",
      })
      .exec();
  }

  // You can add more methods based on your requirements

  // Example: Get articles by a specific author
  static async getArticlesByAuthor(authorId: string): Promise<Article[]> {
    return ArticleModel.find({ "authors.id": authorId })
      .populate({
        path: "author",
        select: "name",
      })
      .exec();
  }

  // Example: Increment the view count of an article
  static async incrementArticleViewCount(articleId: string): Promise<void> {
    await ArticleModel.findByIdAndUpdate(articleId, {
      $inc: { viewCount: 1 },
    }).exec();
  }
}
