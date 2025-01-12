import { Hono } from "hono";
import { handle } from "hono/vercel";
import { CategoryController } from "@/lib/controllers/category.controller";
import { authenticateUser } from "@/lib/middlewares/authenticateUser";
import { validateOwnership } from "@/lib/middlewares/validateOwnership";
import { errorHandler } from "@/lib/middlewares/errorHandler";

const app = new Hono();

// Global error handling (keeping consistent error handling)
app.use("*", errorHandler);

// Apply authentication validation
app.use("*", authenticateUser);

// ID-specific routes
app.get(
  "/api/categories/:id",
  validateOwnership("CATEGORY"),
  CategoryController.getCategory,
);
app.put(
  "/api/categories/:id",
  validateOwnership("CATEGORY"),
  CategoryController.updateCategory,
);
app.delete(
  "/api/categories/:id",
  validateOwnership("CATEGORY"),
  CategoryController.deleteCategory,
);

export const GET = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
