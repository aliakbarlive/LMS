import { Request, Response, NextFunction } from "express";
import CategoryService from "../../services/categoryService";

export const getCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  const categories = await CategoryService.getCategories();
  res.json(categories);
};

export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { label, value } = req.body;
  console.log("create category body: ", req.body);
  await CategoryService.createCategory({ label, value });
  res.status(201).json({ status: true, msg: "Category created successfully" });
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const categoryId = req.params.id;
  console.log("category id : ", categoryId, "req body : ", req.body);
  const { label, value } = req.body;
  await CategoryService.updateCategory(categoryId, { label, value });
  res.status(200).json({ status: true, msg: "Category updated successfully" });
};

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const categoryId = req.params.id;
  await CategoryService.deleteCategory(categoryId);
  res.json({
    status: true,
    msg: "Category and associated articles deleted successfully",
  });
};

export const getCategorizedArticles = async (
  req: Request,
  res: Response
): Promise<void> => {
  const categoryId = req.params.id;
  const articles = await CategoryService.getCategorizedArticles(categoryId);
  res.json(articles);
};

export const getCategorizedArticlesByLabel = async (
  req: Request,
  res: Response
): Promise<void> => {
  const categoryLabel = req.params.label;
  const articles = await CategoryService.getCategorizedArticlesByLabel(
    categoryLabel
  );
  if (!articles) {
    res.status(404).json({ status: false, msg: "Category does not exist" });
    return;
  }
  res.json(articles);
};

export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const categoryId = req.params.id;
  const category = await CategoryService.getCategoryById(categoryId);

  if (category) {
    res.json(category);
  } else {
    res.status(404).json({ msg: "Category not found" });
  }
};

export const getAllCategoriesWithArticles = async (
  req: Request,
  res: Response
): Promise<void> => {
  const categories = await CategoryService.getAllCategoriesWithArticles();
  res.json(categories);
};
