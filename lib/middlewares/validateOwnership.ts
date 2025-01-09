import { Context } from "hono";
import { CategoryRepository } from "@/lib/repositories/categoryRepo";
import { HTTPException } from "hono/http-exception";

export const validateCategoryOwnership = async (
  c: Context,
  next: () => Promise<void>,
) => {
  try {
    const userId = c.get("userId");
    const categoryId = Number(c.req.param("id"));

    if (isNaN(categoryId)) {
      throw new HTTPException(400, { message: "Invalid category ID" });
    }

    const category = await CategoryRepository.getCategoryById(categoryId);

    if (!category) {
      throw new HTTPException(404, { message: "Category not found" });
    }

    if (category.userId !== userId) {
      throw new HTTPException(403, {
        message: "You do not have permission to access this category",
      });
    }

    // Store the category in the context for the controller to use
    c.set("category", category);
    await next();
  } catch (error) {
    if (error instanceof HTTPException) {
      throw error;
    }
    console.error("Error in ownership validation:", error);
    throw new HTTPException(500, {
      message: "Internal server error during ownership validation",
    });
  }
};
