import { Context } from "hono";
import { TaskValidator } from "../validations/validators/task.validator";
import { TaskRepository } from "../repositories/taskRep";
import { HTTPException } from "hono/http-exception";

export class TaskController {
  static async create(c: Context) {
    try {
      const userId = c.get("userId");
      // Use the validator
      const validatedData = await TaskValidator.validateCreate(c);
      // Create the task
      const newTask = await TaskRepository.createTask({
        ...validatedData,
        userId,
      });
      return c.json({
        status: "success",
        data: newTask,
      });
    } catch (err) {
      console.error("Error creating task:", err);
      throw new HTTPException(500,{ message: "Failed to create task" });
    }
  }
  static async getTasks(c: Context){
    try {
      const userId = c.get("userId");
      const tasks = await TaskRepository.getAllUserTasks(userId);
      return c.json({
        status: "success",
        data: tasks,
      });
    } catch (err) {
      console.error("Error fetching tasks:", err);
      throw new HTTPException(500, { message: "Failed to fetch tasks" });
    }
  }
  // get single task
  static async getTask(c: Context){
    try {
      const taskId = parseInt(c.req.param("id"));
      const userId = c.get("userId");
      const task = await TaskRepository.getTaskById(taskId, userId);
      return c.json({
        status: "success",
        data: task,
      });
    } catch (err) {
      console.error("Error fetching task:", err);
      throw new HTTPException(500, { message: "Failed to fetch task" });
    }
  }

  // get tasks by category
  static async getTasksByCategory(c: Context){
    try {
      const categoryId = parseInt(c.req.param("categoryId"));
      const tasks = await TaskRepository.getTasksByCategory(categoryId);
      return c.json({
        status: "success",
        data: tasks,
      });
    } catch (err) {
      console.error("Error fetching tasks by category:", err);
      throw new HTTPException(500, { message: "Failed to fetch tasks by category" });
    }
  }
  // update task
  static async updateTask(c: Context){
    try {
      const taskId = parseInt(c.req.param("id"));
      const body = await c.req.json();
      const validatedData = await TaskValidator.validateUpdate(c);
      const updatedTask = await TaskRepository.updateTask(taskId, {...validatedData,...body });
      return c.json({
        status: "success",
        data: updatedTask,
      });
    } catch (err) {
      console.error("Error updating task:", err);
      throw new HTTPException(500, { message: "Failed to update task" });
    }
  }
  // delete task
  static async deleteTask(c: Context){
    try {
      const taskId = parseInt(c.req.param("id"));
      await TaskRepository.deleteTask(taskId);
      return c.json({
        status: "success",
        message: "Task deleted successfully",
      });
    } catch (err) {
      console.error("Error deleting task:", err);
      throw new HTTPException(500, { message: "Failed to delete task" });
    }
  }
}
