import { TaskComponentController } from "@/src/server/controllers/taskComponent.controller";
import { authenticateUser } from "@/src/server/middlewares/authenticateUser";
import { errorHandler } from "@/src/server/middlewares/errorHandler";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono();

app.use("*", errorHandler);

// Apply authentication to all routes
app.use("*", authenticateUser);

// Only keep the routes that don't need an ID
app.get("/api/task-components", TaskComponentController.getAll);
app.post("/api/task-components", TaskComponentController.create);

export const GET = handle(app);
export const POST = handle(app);
