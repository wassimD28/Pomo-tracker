import { TaskController } from "@/src/server/controllers/task.controller";
import { authenticateUser } from "@/src/server/middlewares/authenticateUser";
import { errorHandler } from "@/src/server/middlewares/errorHandler";
import { validateOwnership } from "@/src/server/middlewares/validateOwnership";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono();

app.use("*", errorHandler);
app.use("*", authenticateUser);

app.get("/api/tasks/:id", validateOwnership("TASK"), TaskController.getTask);
app.put("/api/tasks/:id", validateOwnership("TASK"), TaskController.updateTask);
app.delete("/api/tasks/:id", validateOwnership("TASK"), TaskController.deleteTask);

export const GET = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
