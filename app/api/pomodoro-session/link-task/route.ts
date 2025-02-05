
import { PomodoroSessionController } from "@/src/server/controllers/pomodoro.controller";
import { authenticateUser } from "@/src/server/middlewares/authenticateUser";
import { errorHandler } from "@/src/server/middlewares/errorHandler";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono();

app.use("*", errorHandler);
app.use("*", authenticateUser);

// Link or unlink a task with a Pomodoro session
app.post("/api/pomodoro-session/link-task", PomodoroSessionController.linkTask);

export const POST = handle(app);
