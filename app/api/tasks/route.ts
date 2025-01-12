import { TaskController } from "@/lib/controllers/task.controller";
import { authenticateUser } from "@/lib/middlewares/authenticateUser";
import { errorHandler } from "@/lib/middlewares/errorHandler";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono();

app.use("*", errorHandler);

// Apply authentication to all routes
app.use("*", authenticateUser);

// Only keep the routes that don't need an ID
app.get("/api/tasks", TaskController.getTasks);
app.post("/api/tasks", TaskController.create);

export const GET = handle(app);
export const POST = handle(app);
