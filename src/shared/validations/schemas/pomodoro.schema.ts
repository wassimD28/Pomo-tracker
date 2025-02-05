import { z } from "zod";

export const pomodoroSchema = {
  create: z.object({
    targetTaskId: z.number().int().positive().nullable().optional(),
    focusDuration: z.number().int().positive(),
    cyclesNumber: z.number().int().positive(),
    breakDuration: z.number().int().positive(),
    longBreakDuration: z.number().int().positive(),
    wastedTime: z.number().int().nonnegative(),
    doneCycles: z.number().int().nonnegative().optional(),
    totalSessionDuration: z.number().int().nonnegative().optional(),
    totalFocusDuration: z.number().int().nonnegative().optional(),
    totalBreakDuration: z.number().int().nonnegative().optional(),
    isEnded: z.boolean().optional(),
    // Convert each string in the array to a Date
    pausedAt: z.array(z.string().datetime().transform((val) => new Date(val))).optional(),
    resumedAt: z.array(z.string().datetime().transform((val) => new Date(val))).optional(),
    // Convert single date strings to Date objects
    startedAt: z.string().datetime().transform((val) => new Date(val)).optional(),
    endedAt: z.string().datetime().transform((val) => new Date(val)).optional(),
  }),
  update: z.object({
    wastedTime: z.number().int().nonnegative().optional(),
    doneCycles: z.number().int().nonnegative().optional(),
    totalSessionDuration: z.number().int().nonnegative().optional(),
    totalFocusDuration: z.number().int().nonnegative().optional(),
    totalBreakDuration: z.number().int().nonnegative().optional(),
    isEnded: z.boolean().optional(),
    // Apply the same transformations for update fields
    pausedAt: z.array(z.string().datetime().transform((val) => new Date(val))).optional(),
    resumedAt: z.array(z.string().datetime().transform((val) => new Date(val))).optional(),
    endedAt: z.string().datetime().transform((val) => new Date(val)).nullable().optional(),
    isCompleted: z.boolean().optional(),
  }),
  linkTask: z.object({
    sessionId: z.number().int().positive(),
    taskId: z.number().int().positive().nullable(),
  }),
};