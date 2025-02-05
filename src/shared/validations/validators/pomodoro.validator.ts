

import { Context } from "hono";
import { pomodoroSchema } from "../schemas/pomodoro.schema";
import { ValidationError } from "../errors/validation.error";

export class PomodoroSessionValidator {
  static async validateCreate(c: Context) {
    try {
      const body = await c.req.json();
      return await pomodoroSchema.create.parseAsync(body);
    } catch (error) {
      throw new ValidationError("Invalid session data", error);
    }
  }

  static async validateUpdate(c: Context) {
    try {
      const body = await c.req.json();
      return await pomodoroSchema.update.parseAsync(body);
    } catch (error) {
      throw new ValidationError("Invalid session data", error);
    }
  }

  static async validateLinkTask(c: Context) {
    try {
      const body = await c.req.json();
      return await pomodoroSchema.linkTask.parseAsync(body);
    } catch (error) {
      throw new ValidationError("Invalid link task data", error);
    }
  }
}
