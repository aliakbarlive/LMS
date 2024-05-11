// routes/categoryRoutes.ts
import express from 'express';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategorizedArticles,
  getCategoryById,
  getAllCategoriesWithArticles,
  getCategorizedArticlesByLabel,
} from '../../controllers/categoryController';

const router = express.Router();

// Define category routes
router.get('/', getCategories);
router.post('/', createCategory);
router.get('/categories-with-articles', getAllCategoriesWithArticles);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);
router.get('/:id/articles', getCategorizedArticles);
router.get('/by-label/:label/articles', getCategorizedArticlesByLabel);
router.get('/:id', getCategoryById);

export default router;
