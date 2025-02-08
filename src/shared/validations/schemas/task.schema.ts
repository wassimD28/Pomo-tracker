import { z } from "zod";

export const taskSchema = {
  create: z.object({
    title: z
      .string()
      .min(1, "Task title is required")
      .max(100, "Task title must be less than 100 characters")
      .trim(),
    categoryId: z.number().int().positive(),
  }),
  update: z.object({
    title: z
      .string()
      .min(1, "Task title is required")
      .max(100, "Task title must be less than 100 characters")
      .trim(),
    categoryId: z.number().int().positive(),
    isCompleted: z.boolean(),
    inTodayTodos: z.boolean().optional(),
  }),
};
