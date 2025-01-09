import { db } from "@/db/drizzle";
import { categories } from "../../db/schema";
import { eq } from "drizzle-orm";

interface CreateCategoryParams {
  name: string;
  userId: number;
}

interface UpdateCategoryParams {
  name: string;
}

export class CategoryRepository {
  // Create a new category
  static async createCategory(params: CreateCategoryParams) {
    try {
      const [newCategory] = await db
        .insert(categories)
        .values({
          name: params.name,
          userId: params.userId,
        })
        .returning();

      return newCategory;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  }

  // Get category by ID
  static async getCategoryById(categoryId: number) {
    try {
      const category = await db.query.categories.findFirst({
        where: eq(categories.id, Number(categoryId)),
      });

      return category;
    } catch (error) {
      console.error("Error fetching category:", error);
      throw error;
    }
  }

  // Get all categories for a specific user
  static async getCategoriesByUserId(userId: number) {
    try {
      const categoriesList = await db.query.categories.findMany({
        where: eq(categories.userId, Number(userId)),
      });

      return categoriesList;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  // Update category
  static async updateCategory(categoryId: number, data: UpdateCategoryParams) {
    try {
      const [updatedCategory] = await db
        .update(categories)
        .set(data)
        .where(eq(categories.id, Number(categoryId)))
        .returning();

      return updatedCategory;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  }

  // Delete category
  static async deleteCategory(categoryId: number) {
    try {
      const [deletedCategory] = await db
        .delete(categories)
        .where(eq(categories.id, Number(categoryId)))
        .returning();

      return deletedCategory;
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  }
}
