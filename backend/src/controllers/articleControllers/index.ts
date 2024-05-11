import { Request, Response, NextFunction } from 'express';
import ArticleService from '../../services/articleService';
import fs from 'fs';

export const getArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const articleId = req.params.id;
    const article = await ArticleService.getArticle(articleId);

    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    next(error)
  }
};

export const getOthersArticleList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const articleId = req.params.id;
    const { relatedArticle, popularArticle } = await ArticleService.getOthersArticleList(articleId);
    res.json({ relatedArticle, popularArticle });
  } catch (error) {
    next(error)
  }
};

export const createArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('ARTICLE BODY : ', req.body);
    const user = req?.user;
    // console.log('User : ', user);
    // console.log('User id : ', req);
    // console.log('Request Body : ', req.body);

    const { title, metaTitle, metaDescription, coverImageCredit, content, value, category } = req.body;

    // Assuming req.file is available after file upload

    if (!req.file) {
      throw new Error('No file uploaded');
    }
    const { originalname, path } = req.file;
    const coverImage = originalname;
    const filePath = path;

    const newArticle = await ArticleService.createArticle({
      title,
      meta_title: metaTitle,
      meta_description: metaDescription,
      cover_image_credit: coverImageCredit,
      content,
      value,
      cover_image: coverImage,
      category,
      author: user,
      filePath: filePath // adding filePath
    }); res.status(201).json({ status: true, msg: "Article created successfully", newArticle });
  } catch (error) {
    next(error)
  }
};
// export const createArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const user = req?.userId;
//     const { title, metaTitle, metaDescription, coverImageCredit, content, value, category, coverImage } = req.body;

//   // Check if coverImage is provided in the request body
//   if (!coverImage) {
//      res.status(400).json({ error: 'Cover image is missing in the request body' });
//   }

//   // Decode the base64 image data
//   const base64Data = coverImage.replace(/^data:image\/\w+;base64,/, '');
//   const buffer = Buffer.from(base64Data, 'base64');

//   // Generate a unique filename for the image
//   const fileName = `cover_${Date.now()}.png`;

//   // Save the image to the filesystem
//   fs.writeFileSync(`uploads/${fileName}`, buffer, 'base64');


//     // Create the article with the uploaded image
//     const newArticle = await ArticleService.createArticle({
//       title,
//       meta_title: metaTitle,
//       meta_description: metaDescription,
//       cover_image_credit: coverImageCredit,
//       content,
//       value,
//       cover_image: fileName, // Use the filename as the cover image path
//       category,
//       author: user
//     });

//     res.status(201).json({ status: true, msg: "Article created successfully", newArticle });
//   } catch (error) {
//     next(error);
//   }
// }; 

export const updateArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const articleId = req.params.id;
  const { title, metaTitle, metaDescription, coverImageCredit, content, value, coverImage, category } = req.body

  try {
    const updatedArticle = await ArticleService.updateArticle(articleId, { title, meta_title: metaTitle, meta_description: metaDescription, cover_image_credit: coverImageCredit, content, value, cover_image: coverImage, category });

    if (updatedArticle) {
      res.json(updatedArticle);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    next(error)
  }
};

export const deleteArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const articleId = req.params.id;

  try {
    await ArticleService.deleteArticle(articleId);
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    next(error)
  }
};

export const getAllArticles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const articles = await ArticleService.getAllArticles();
    res.json(articles);
  } catch (error) {
    next(error)
  }
};

export const getArticlesByCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categoryId = req.params.categoryId;
    const articles = await ArticleService.getArticlesByCategory(categoryId);
    res.json(articles);
  } catch (error) {
    next(error)
  }
};



