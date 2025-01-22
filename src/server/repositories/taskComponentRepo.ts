import { ContentType } from "@/src/shared/types/enum/common.enum";
import { db } from "@/src/server/db/drizzle";
import { taskComponents } from "@/src/server/db/schema";
import { eq } from "drizzle-orm";

interface CreateTaskComponentParams {
  userId: number;
  taskId: number;
  order: number;
  content: string;
  type: ContentType;
}
interface UpdateTaskComponentParams {
  order: number;
  content: string;
}
export class TaskComponentRepository {
  // Create a new task component
  static async create(params: CreateTaskComponentParams) {
    try {
      const [newTaskComponent] = await db
        .insert(taskComponents)
        .values({
          userId: params.userId,
          taskId: params.taskId,
          order: params.order,
          content: params.content,
          type: params.type,
        })
        .returning();
      return newTaskComponent;
    } catch (error) {
      console.error("Failed to create task component:", error);
      throw error;
    }
  }
  // Get all task components for a task
  static async getAllByTaskId(taskId: number) {
    try {
      if (!taskId || isNaN(taskId)) {
        throw new Error("Invalid taskId provided to repository");
      }
      const taskComponentsList = await db
        .select()
        .from(taskComponents)
        .where(eq(taskComponents.taskId, taskId));

      return taskComponentsList;
    } catch (error) {
      console.error("Failed to fetch task components:", error);
      throw error;
    }
  }
  // update task components
  static async update(id: number, params: UpdateTaskComponentParams) {
    try {
      const [updatedTaskComponent] = await db
        .update(taskComponents)
        .set(params)
        .where(eq(taskComponents.id, id))
        .returning();
      return updatedTaskComponent;
    } catch (error) {
      console.error("Failed to update task component:", error);
      throw error;
    }
  }
  // Delete task components
  static async delete(id: number) {
    try {
      // check if the id is valid
      if (!id || isNaN(id)) {
        throw new Error("Invalid id provided to repository");
      }

      await db.delete(taskComponents).where(eq(taskComponents.id, id));
    } catch (error) {
      console.error("Failed to delete task component:", error);
      throw error;
    }
  }
  // Get a task component by id
  static async getOneById(id: number) {
    try {
      if (!id || isNaN(id)) {
        throw new Error("Invalid id provided to repository");
      }
      const [taskComponent] = await db // Destructure the first item
        .select()
        .from(taskComponents)
        .where(eq(taskComponents.id, id));

      return taskComponent || null; // Return null if no component found
    } catch (error) {
      console.error("Failed to get task component:", error);
      throw error;
    }
  }
}
