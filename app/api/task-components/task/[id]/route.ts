import { TaskComponentController } from "@/src/server/controllers/taskComponent.controller";
import { authenticateUser } from "@/src/server/middlewares/authenticateUser";
import { errorHandler } from "@/src/server/middlewares/errorHandler";
import { validateOwnership } from "@/src/server/middlewares/validateOwnership";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono();

app.use("*", errorHandler);
app.use("*", authenticateUser);

app.get(
  "/api/task-components/task/:id", // /api/task-components/task/1
  validateOwnership("TASK"),
  TaskComponentController.getAll,
);

export const GET = handle(app);
