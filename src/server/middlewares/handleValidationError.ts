import { Context } from "hono";
import { ValidationError } from "@/src/shared/validations/errors/validation.error";

export const handleValidationErrors = async (
  c: Context,
  next: () => Promise<void>,
) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof ValidationError) {
      return c.json(
        {
          status: "error",
          message: error.message,
          errors: error.errors.errors || error.errors,
        },
        400,
      );
    }
    throw error;
  }
};
