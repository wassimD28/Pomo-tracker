// src/app/api/categories/route.ts
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { CategoryController } from "@/lib/controllers/category.controller";
import { authenticateUser } from "@/lib/middlewares/authenticateUser";
import { validateCategoryOwnership } from "@/lib/middlewares/validateOwnership";
import { HTTPException } from "hono/http-exception";

const app = new Hono().basePath("/api/categories");

// Global error handling
app.use("*", async (c, next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof HTTPException) {
      return c.json(
        {
          status: "error",
          message: error.message,
        },
        error.status,
      );
    }
    console.error(error);
    return c.json(
      {
        status: "error",
        message: "Internal Server Error",
      },
      500,
    );
  }
});

// Apply authentication to all routes
app.use("*", authenticateUser);

// Routes
app.get("/", CategoryController.getCategories);
app.post("/", CategoryController.createCategory);
app.get("/:id", validateCategoryOwnership, CategoryController.getCategory);
app.put("/:id", validateCategoryOwnership, CategoryController.updateCategory);
app.delete(
  "/:id",
  validateCategoryOwnership,
  CategoryController.deleteCategory,
);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
