import { PomodoroSessionController } from "@/src/server/controllers/pomodoro.controller";
import { authenticateUser } from "@/src/server/middlewares/authenticateUser";
import { errorHandler } from "@/src/server/middlewares/errorHandler";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono();

app.use("*", errorHandler);
app.use("*", authenticateUser);

// Create new session
app.post("/api/pomodoro-session", PomodoroSessionController.create);

// Get all user's sessions
app.get("/api/pomodoro-session", PomodoroSessionController.getUserSessions);


export const POST = handle(app);
export const GET = handle(app);
