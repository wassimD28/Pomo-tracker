import { TaskController } from "@/lib/controllers/task.controller";
import { authenticateUser } from "@/lib/middlewares/authenticateUser";
import { errorHandler } from "@/lib/middlewares/errorHandler";
import { validateCategoryOwnership } from "@/lib/middlewares/validateOwnership";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono();

app.use("*", errorHandler);
app.use("*", authenticateUser);

app.get("/api/tasks/:id", validateCategoryOwnership, TaskController.getTask);
app.put("/api/tasks/:id", validateCategoryOwnership, TaskController.updateTask);
app.delete(
  "/api/tasks/:id",
  validateCategoryOwnership,
  TaskController.deleteTask,
);

export const GET = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
