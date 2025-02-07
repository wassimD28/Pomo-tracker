import { TaskController } from "@/src/server/controllers/task.controller";
import { authenticateUser } from "@/src/server/middlewares/authenticateUser";
import { errorHandler } from "@/src/server/middlewares/errorHandler";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono();
app.use("*", errorHandler)
// Use the authentication middleware for all routes in this file.
app.use("*", authenticateUser);

app.get("/api/tasks/search", async (c) => {
  const searchTerm = c.req.query("q");
  return TaskController.searchTasks(c, searchTerm);
});

export const GET = handle(app);
