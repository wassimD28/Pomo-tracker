import { Context } from "hono";
import { settingsSchema } from "../schemas/settings.schema";
import { ValidationError } from "../errors/validation.error";

export class SettingsValidator {
  static async validateUpdate(c: Context) {
    try {
      const body = await c.req.json();
      const validated = await settingsSchema.update.parseAsync(body);
      return validated;
    } catch (error) {
      throw new ValidationError("Invalid settings data", error);
    }
  }
}
