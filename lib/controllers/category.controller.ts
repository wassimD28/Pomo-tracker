import { Context } from "hono";
import { CategoryRepository } from "../repositories/categoryRepo";
import { CategoryValidator } from "../validations/validators/category.validator";
import { HTTPException } from "hono/http-exception";

export class CategoryController {
  static async createCategory(c: Context) {
    try {
      const userId = c.get("userId");

      // Use the validator
      const validatedData = await CategoryValidator.validateCreate(c);

      const newCategory = await CategoryRepository.createCategory({
        ...validatedData,
        userId,
      });

      return c.json(
        {
          status: "success",
          data: newCategory,
        },
        201,
      );
    } catch (error) {
      console.error("Error creating category:", error);
      throw new HTTPException(500, { message: "Failed to create category" });
    }
  }

  static async getCategories(c: Context) {
    try {
      const userId = c.get("userId");

      const categories = await CategoryRepository.getCategoriesByUserId(userId);

      return c.json({
        status: "success",
        data: categories,
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new HTTPException(500, { message: "Failed to fetch categories" });
    }
  }

  static async getCategory(c: Context) {
    try {
      const categoryId = parseInt(c.req.param("id"));

      const category = await CategoryRepository.getCategoryById(categoryId);
      if (!category) {
        throw new HTTPException(404, { message: "Category not found" });
      }
      return c.json({
        status: "success",
        data: category,
      });
    } catch (error) {
      console.error("Error fetching category:", error);
      throw new HTTPException(500, { message: "Failed to fetch category" });
    }
  }

  static async updateCategory(c: Context) {
    try {
      const categoryId = parseInt(c.req.param("id"));
      const validatedData = await CategoryValidator.validateUpdate(c);
      // get the specific category
      const category = await CategoryRepository.getCategoryById(categoryId);
      if (!category) {
        throw new HTTPException(404, { message: "Category not found" });
      }
      // update the category
      const updatedCategory = await CategoryRepository.updateCategory(
        categoryId,
        validatedData,
      );
      return c.json({
        status: "success",
        data: updatedCategory,
      });
    } catch (error) {
      console.error("Error fetching category:", error);
      throw new HTTPException(500, { message: "Failed to fetch category" });
    }
  }

  static async deleteCategory(c: Context) {
    try {
      const categoryId = parseInt(c.req.param("id"));
      const category = await CategoryRepository.getCategoryById(categoryId);
      if (!category) {
        throw new HTTPException(404, { message: "Category not found" });
      }
      await CategoryRepository.deleteCategory(categoryId);
      return c.json({
        status: "success",
        message: "Category deleted successfully",
      });
    } catch (error) {
      console.error("Error fetching category:", error);
      throw new HTTPException(500, { message: "Failed to delete category" });
    }
  }
}
