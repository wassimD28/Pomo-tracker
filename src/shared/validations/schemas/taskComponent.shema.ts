import { z } from "zod"

export const taskComponentSchema = {
  create: z.object({
    taskId: z.number().int().positive(),
    order: z.number().int().positive(),
    content: z.string().min(1).max(1000).trim(),
    type: z.enum(["text", "image", "link"]),
  }),
  update: z.object({
    order: z.number().int().positive(),
    content: z.string().min(1).max(1000).trim(),
  }),
};