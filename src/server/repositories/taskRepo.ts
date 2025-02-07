import { db } from "@/src/server/db/drizzle";
import { categories, tasks } from "@/src/server/db/schema";
import { and, eq, ilike } from "drizzle-orm";

interface CreateTaskParams {
  userId: number;
  categoryId: number;
  title: string;
}

interface UpdateTaskParams {
  title?: string;
  completed?: boolean;
}

export class TaskRepository {
  static async searchTask(userId: number, searchTerm: string) {
    try {

      const foundTasks = await db
        .select({
          id: tasks.id,
          categoryId: tasks.categoryId,
          title: tasks.title,
          isCompleted: tasks.isCompleted,
          createdAt: tasks.createdAt,
          updatedAt: tasks.updatedAt,
          // Include category as a nested object
          category: {
            id: categories.id,
            name: categories.name,
          },
        })
        .from(tasks)
        .innerJoin(categories, eq(tasks.categoryId, categories.id))
        .where(
          and(eq(tasks.userId, userId), ilike(tasks.title, `%${searchTerm}%`)),
        ).limit(4);

      console.log("Raw database results:", foundTasks);
      return foundTasks;
    } catch (error) {
      console.log("Failed to search task:", error);
      throw error;
    }
  }
  // Create
  static async createTask(params: CreateTaskParams) {
    try {
      const [newTask] = await db
        .insert(tasks)
        .values({
          userId: params.userId,
          categoryId: params.categoryId,
          title: params.title,
        })
        .returning();

      return newTask;
    } catch (err) {
      console.error("Failed to create task:", err);
      throw err;
    }
  }

  // Get single task
  static async getTaskById(taskId: number) {
    try {
      const task = await db
        .select()
        .from(tasks)
        .where(and(eq(tasks.id, taskId)))
        .then((res) => res[0]);

      return task;
    } catch (err) {
      console.error("Failed to get task:", err);
      throw err;
    }
  }

  //  Get all tasks for a user
  static async getAllUserTasks(userId: number) {
    try {
      const userTasks = await db
        .select()
        .from(tasks)
        .where(eq(tasks.userId, userId));

      return userTasks;
    } catch (err) {
      console.error("Failed to get user tasks:", err);
      throw err;
    }
  }

  // Get tasks by category
  static async getTasksByCategory(categoryId: number) {
    try {
      const categoryTasks = await db
        .select()
        .from(tasks)
        .where(and(eq(tasks.categoryId, categoryId)));

      return categoryTasks;
    } catch (err) {
      console.error("Failed to get category tasks:", err);
      throw err;
    }
  }

  // Update task
  static async updateTask(taskId: number, params: UpdateTaskParams) {
    try {
      const [updatedTask] = await db
        .update(tasks)
        .set(params)
        .where(and(eq(tasks.id, taskId)))
        .returning();

      return updatedTask;
    } catch (err) {
      console.error("Failed to update task:", err);
      throw err;
    }
  }

  // Delete task
  static async deleteTask(taskId: number) {
    try {
      const [deletedTask] = await db
        .delete(tasks)
        .where(and(eq(tasks.id, taskId)))
        .returning();

      return deletedTask;
    } catch (err) {
      console.error("Failed to delete task:", err);
      throw err;
    }
  }
}
