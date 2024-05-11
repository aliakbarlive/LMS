// routes/articleRoutes.ts
import express from 'express';
import * as ArticleController from '../../controllers/articleControllers';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { upload } from '../../helpers/filehelper';

const router = express.Router();

// Define routes for articles
router.get('/:id', ArticleController.getArticle);
router.get('/:id/others', ArticleController.getOthersArticleList);
router.post('/',authMiddleware,upload.single('coverImage'),ArticleController.createArticle);
router.put('/:id', ArticleController.updateArticle);
router.delete('/:id', ArticleController.deleteArticle);
router.get('/', ArticleController.getAllArticles);
router.get('/category/:categoryId', ArticleController.getArticlesByCategory);

export default router;
