import { z } from "zod";

export const settingsSchema = {
  update: z.object({
    darkmode: z.boolean().optional(),
    defaultFocusDuration: z
      .number()
      .int()
      .positive()
      .min(60, "Session duration must be at least 1 minute")
      .max(7200, "Session duration cannot exceed 2 hours")
      .optional(),
    defaultBreakDuration: z
      .number()
      .int()
      .positive()
      .min(30, "Break duration must be at least 30 seconds")
      .max(1800, "Break duration cannot exceed 30 minutes")
      .optional(),
    defaultLongBreakDuration: z
      .number()
      .int()
      .positive()
      .min(300, "Long break duration must be at least 5 minutes")
      .max(3600, "Long break duration cannot exceed 1 hour")
      .optional(),
    defaultCyclesNumber: z
      .number()
      .int()
      .positive()
      .min(1, "Must have at least 1 cycle")
      .max(10, "Cannot have more than 10 cycles")
      .optional(),
  }),
};
