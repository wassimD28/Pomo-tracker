// src/shared/validations/schemas/settings.schema.ts
import { z } from "zod";

export const settingsSchema = {
  update: z.object({
    darkmode: z.boolean().optional(),
    defaultCyclesNumber: z
      .number()
      .int()
      .min(1, "Minimum 1 cycle")
      .max(10, "Maximum 10 cycles")
      .optional(),
    defaultFocusDuration: z
      .number()
      .int()
      .min(300, "Minimum focus duration is 5 minutes")
      .max(3600, "Maximum focus duration is 60 minutes")
      .optional(),
    defaultBreakDuration: z
      .number()
      .int()
      .min(60, "Minimum break duration is 1 minute")
      .max(1800, "Maximum break duration is 30 minutes")
      .optional(),
    defaultLongBreakDuration: z
      .number()
      .int()
      .min(300, "Minimum long break duration is 5 minutes")
      .max(2700, "Maximum long break duration is 45 minutes")
      .optional(),
  }),
};


