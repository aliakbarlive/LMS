import CategoryModel, { Category } from '../../models/Category/categorySchema';
import ArticleModel, {Article} from '../../models/Article/articleModel'; // Assuming you have an article model

export default class CategoryService {
  static async getCategories(): Promise<Category[]> {
    return CategoryModel.find().exec();
  }

  static async createCategory(categoryData: { label: string; value: string }): Promise<void> {
    await CategoryModel.create(categoryData);
  }

  static async updateCategory(categoryId: string, categoryData: { label?: string; value?: string }): Promise<void> {
    await CategoryModel.findByIdAndUpdate(categoryId, categoryData).exec();
  }

  static async deleteCategory(categoryId: string): Promise<void> {
    // Deleting associated articles
    await ArticleModel.deleteMany({ category: categoryId }).exec();
    
    // Deleting the category
    await CategoryModel.findByIdAndDelete(categoryId).exec();
  }

  static async getCategorizedArticles(categoryId: string): Promise<Article[]> {
    return ArticleModel.find({ category: categoryId }).exec();
  }

  static async getCategorizedArticlesByLabel(categoryLabel: string): Promise<Article[]> {
    if(categoryLabel == 'all'){
      return ArticleModel.find({}).exec();
    }else{
      const category = await CategoryModel.findOne({value:categoryLabel})
      const categoryId = category?._id
      return ArticleModel.find({ category: categoryId }).exec();
    }
  }

  static async getCategoryById(categoryId: string): Promise<Category | null> {
    return CategoryModel.findById(categoryId).exec();
  }
  
  static async getAllCategoriesWithArticles(): Promise<Category[]> {
    try {
      const categoriesWithArticles = await CategoryModel.aggregate([
        {
          $lookup: {
            from: 'articles', // Replace with your actual collection name for articles
            let: { categoryId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$category', '$$categoryId'],
                  },
                },
              },
              {
                $project: {
                  _id: 1,
                  title: 1,
                  content: 1,
                  // Include other article fields you need
                },
              },
            ],
            as: 'articles',
          },
        },
        {
          $project: {
            _id: 1,
            label: 1,
            value: 1,
            articles: 1,
          },
        },
      ]);

      return categoriesWithArticles;
    } catch (error) {
      console.error(error);
      throw new Error('Internal Server Error');
    }
  }

 }
