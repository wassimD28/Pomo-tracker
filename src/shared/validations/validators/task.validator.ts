import { Context } from "hono";
import { taskSchema } from "../schemas/task.shema";
import { ValidationError } from "../errors/validation.error";

export class TaskValidator {
  static async validateCreate(c: Context) {
    try {
      const body = await c.req.json();
      const validated = await taskSchema.create.parseAsync(body);
      return validated;
    } catch (error) {
      throw new ValidationError("Invalid task data", error);
    }
  }

  static async validateUpdate(c: Context) {
    try {
      const body = await c.req.json();
      const validated = await taskSchema.update.parseAsync(body);
      return validated;
    } catch (error) {
      throw new ValidationError("Invalid task data", error);
    }
  }

  
}