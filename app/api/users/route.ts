import { UserController } from "@/src/server/controllers/user.controller";
import { authenticateUser } from "@/src/server/middlewares/authenticateUser";
import { errorHandler } from "@/src/server/middlewares/errorHandler";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api/user");

// Global error handling
app.use("*", errorHandler);

app.use("*", authenticateUser);

// Routes
app.get("/api/users", UserController.getUserByClerkId);

export const GET = handle(app);