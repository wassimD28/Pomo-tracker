import { TaskComponentController } from "@/src/server/controllers/taskComponent.controller";
import { authenticateUser } from "@/src/server/middlewares/authenticateUser";
import { errorHandler } from "@/src/server/middlewares/errorHandler";
import { validateOwnership } from "@/src/server/middlewares/validateOwnership";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono();

app.use("*", errorHandler);

// Apply authentication to all routes
app.use("*", authenticateUser);


app.delete("/api/task-components/:id", validateOwnership("TASK_COMPONENT"), TaskComponentController.delete);
app.put(
  "/api/task-components/:id",
  validateOwnership("TASK_COMPONENT"),
  TaskComponentController.update,
);

export const DELETE = handle(app);
export const PUT = handle(app);
