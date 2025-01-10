import { Hono } from "hono";
import { handle } from "hono/vercel";
import { CategoryController } from "@/lib/controllers/category.controller";
import { authenticateUser } from "@/lib/middlewares/authenticateUser";
import { validateCategoryOwnership } from "@/lib/middlewares/validateOwnership";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

// Global error handling (keeping consistent error handling)
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

// Apply authentication validation
app.use("*", authenticateUser);

// ID-specific routes
app.get("/api/categories/:id",validateCategoryOwnership, CategoryController.getCategory);
app.put("/api/categories/:id",validateCategoryOwnership, CategoryController.updateCategory);
app.delete("/api/categories/:id",validateCategoryOwnership, CategoryController.deleteCategory);

export const GET = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
