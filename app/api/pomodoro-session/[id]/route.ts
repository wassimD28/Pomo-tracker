import { PomodoroSessionController } from "@/src/server/controllers/pomodoro.controller";
import { authenticateUser } from "@/src/server/middlewares/authenticateUser";
import { errorHandler } from "@/src/server/middlewares/errorHandler";
import { validateOwnership } from "@/src/server/middlewares/validateOwnership";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono();

app.use("*", errorHandler);
app.use("*", authenticateUser);

// Get single session
app.get(
  "/api/pomodoro-session/:id",
  validateOwnership("POMODORO_SESSION"),
  PomodoroSessionController.getSession,
);

// Update session
app.put(
  "/api/pomodoro-session/:id",
  validateOwnership("POMODORO_SESSION"),
  PomodoroSessionController.update,
);

// Delete session
app.delete(
  "/api/pomodoro-session/:id",
  validateOwnership("POMODORO_SESSION"),
  PomodoroSessionController.delete,
);

export const GET = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
