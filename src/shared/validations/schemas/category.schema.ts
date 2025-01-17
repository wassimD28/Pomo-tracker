import { z } from "zod";

export const categorySchema = {
  create: z.object({
    name: z
      .string()
      .min(1, "Category name is required")
      .max(100, "Category name must be less than 100 characters")
      .trim(),
  }),

  update: z.object({
    name: z
      .string()
      .min(1, "Category name is required")
      .max(100, "Category name must be less than 100 characters")
      .trim(),
  }),
};
