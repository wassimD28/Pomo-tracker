import { Hono } from "hono";
import { handle } from "hono/vercel";
import { db } from "@/db/drizzle";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";

const app = new Hono().basePath("/api/tasks");

// Error handling middleware
app.use("*", async (c, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

// Get all tasks
app.get("/", async (c) => {
  try {
    // This will select all tasks from your database
    const allTasks = await db.select().from(tasks);
    return c.json({ tasks: allTasks });
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return c.json({ error: "Failed to fetch tasks" }, 500);
  }
});

// Create a new task
app.post("/", async (c) => {
  try {
    const body = await c.req.json();

    // Validate required fields
    if (!body.title || !body.description) {
      return c.json({ error: "Title and description are required" }, 400);
    }

    // Insert the new task
    const [newTask] = await db
      .insert(tasks)
      .values({
        userId : body.userId,
        title: body.title,
        description: body.description,
        isCompleted: body.isCompleted ?? false,
      })
      .returning();

    return c.json({ task: newTask });
  } catch (error) {
    console.error("Failed to create task:", error);
    return c.json({ error: "Failed to create task" }, 500);
  }
});

// Update a task
app.put("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();

    const [updatedTask] = await db
      .update(tasks)
      .set({
        title: body.title,
        description: body.description,
        isCompleted: body.isCompleted,
        updatedAt: new Date(),
      })
      .where(tasks.id, id)
      .returning();

    if (!updatedTask) {
      return c.json({ error: "Task not found" }, 404);
    }

    return c.json({ task: updatedTask });
  } catch (error) {
    console.error("Failed to update task:", error);
    return c.json({ error: "Failed to update task" }, 500);
  }
});

// Delete a task
app.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");

    const [deletedTask] = await db
      .delete(tasks)
      .where(eq(tasks.id, id))
      .returning();

    if (!deletedTask) {
      return c.json({ error: "Task not found" }, 404);
    }

    return c.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Failed to delete task:", error);
    return c.json({ error: "Failed to delete task" }, 500);
  }
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
