import { Context } from "hono";
import { categorySchema } from "../schemas/category.schema";
import { ValidationError } from "../errors/validation.error";

export class CategoryValidator {
  static async validateCreate(c: Context) {
    try {
      const body = await c.req.json();
      const validated = await categorySchema.create.parseAsync(body);
      return validated;
    } catch (error) {
      throw new ValidationError("Invalid category data", error);
    }
  }

  static async validateUpdate(c: Context) {
    try {
      const body = await c.req.json();
      const validated = await categorySchema.update.parseAsync(body);
      return validated;
    } catch (error) {
      throw new ValidationError("Invalid category data", error);
    }
  }
}
