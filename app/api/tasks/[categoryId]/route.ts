import { TaskController } from "@/lib/controllers/task.controller";
import { authenticateUser } from "@/lib/middlewares/authenticateUser";
import { errorHandler } from "@/lib/middlewares/errorHandler";
import { validateCategoryOwnership } from "@/lib/middlewares/validateOwnership";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono();

app.use("*", errorHandler);
app.use("*", authenticateUser);

app.get("/api/tasks/:categoryId", validateCategoryOwnership, TaskController.getTasksByCategory);


export const GET = handle(app);
