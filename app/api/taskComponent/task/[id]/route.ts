import { TaskController } from "@/lib/controllers/task.controller";
import { authenticateUser } from "@/lib/middlewares/authenticateUser";
import { errorHandler } from "@/lib/middlewares/errorHandler";
import { validateOwnership } from "@/lib/middlewares/validateOwnership";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono();

app.use("*", errorHandler);
app.use("*", authenticateUser);

app.get(
  "/api/taskComponent/task/:id",
  validateOwnership("TASK"),
  TaskController.getTasksByCategory,
);

export const GET = handle(app);
