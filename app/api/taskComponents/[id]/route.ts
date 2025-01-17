import { TaskComponentController } from "@/lib/controllers/taskComponent.controller";
import { authenticateUser } from "@/lib/middlewares/authenticateUser";
import { errorHandler } from "@/lib/middlewares/errorHandler";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono();

app.use("*", errorHandler);

// Apply authentication to all routes
app.use("*", authenticateUser);

// Only keep the routes that don't need an ID
app.get("/api/taskDetails", TaskComponentController.getAll);
app.post("/api/taskDetails", TaskComponentController.create);

export const GET = handle(app);
export const POST = handle(app);
