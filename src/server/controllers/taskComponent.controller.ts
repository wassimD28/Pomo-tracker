import { Context } from "hono";
import { TaskComponentValidator } from "@/src/shared/validations/validators/taskComponent.validator";
import { TaskComponentRepository } from "../repositories/taskComponentRepo";
import { HTTPException } from "hono/http-exception";
import { ContentType } from "@/src/shared/types/enum/common.enum";
export class TaskComponentController {
  static async create(c: Context) {
    try {
      const userId = c.get("userId");
      const validatedData = await TaskComponentValidator.validateCreate(c);

      // Create the task component with type assertion
      const newTaskComponent = await TaskComponentRepository.create({
        userId,
        taskId: validatedData.taskId,
        order: validatedData.order,
        content: validatedData.content,
        type: validatedData.type as ContentType,
      });

      return c.json({
        status: "success",
        data: newTaskComponent,
      });
    } catch (error) {
      console.error("Error creating task component:", error);
      throw new HTTPException(500, {
        message: "Failed to create task component",
      });
    }
  }

  static async getAll(c: Context) {
    try {
      const taskId = Number(c.req.param("id"));

      const taskComponents =
        await TaskComponentRepository.getAllByTaskId(taskId);

      return c.json({
        status: "success",
        data: taskComponents,
      });
    } catch (error) {
      console.error("Error fetching task components:", error);
      throw new HTTPException(500, {
        message: "Failed to fetch task components",
      });
    }
  }

  // delete task comp
  static async delete(c: Context) {
    try {
      const taskCompId = Number(c.req.param("id"));

      // Delete the task component
      await TaskComponentRepository.delete(taskCompId);

      // Send a success response
      return c.json({
        status: "success",
        message: "Task component deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting task components:", error);
      throw new HTTPException(500, {
        message: "Failed to delete task components",
      });
    }
  }
  // update task comp
  static async update(c: Context) {
    try {
      const taskCompId = Number(c.req.param("id"));
      const validatedData = await TaskComponentValidator.validateUpdate(c);

      const updatedTaskComp = await TaskComponentRepository.update(taskCompId,{ ...validatedData});
      
      return c.json({
        status: "success",
        data: updatedTaskComp,
      });
    } catch (error) {
      console.error("Error updating task components:", error);
      throw new HTTPException(500, {
        message: "Failed to update task components",
      });
    }
  }
}
