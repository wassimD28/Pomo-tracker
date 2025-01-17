import { TaskController } from "@/src/server/controllers/task.controller";
import { authenticateUser } from "@/src/server/middlewares/authenticateUser";
import { errorHandler } from "@/src/server/middlewares/errorHandler";
import { validateOwnership } from "@/src/server/middlewares/validateOwnership";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono();

app.use("*", errorHandler);
app.use("*", authenticateUser);

app.get(
  "/api/tasks/category/:id",
  validateOwnership("CATEGORY"),
  TaskController.getTasksByCategory,
);

export const GET = handle(app);
