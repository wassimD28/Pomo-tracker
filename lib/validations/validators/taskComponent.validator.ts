import { Context } from "hono";
import { taskComponentSchema } from "../schemas/taskComponent.shema";
import { ValidationError } from "../errors/validation.error";

export class TaskComponentValidator{
  static async validateCreate(c :Context){
    try {
      const body = await c.req.json();
      const validatedData = await taskComponentSchema.create.parseAsync(body);
      return validatedData;
    } catch (error) {
      throw new ValidationError("Invalid task component data", error);
    }
  }
  static async validateUpdate(c :Context){
    try {
      const body = await c.req.json();
      const validatedData = await taskComponentSchema.update.parseAsync(body);
      return validatedData;
    } catch (error) {
      throw new ValidationError("Invalid task component data", error);
    }
  }
}