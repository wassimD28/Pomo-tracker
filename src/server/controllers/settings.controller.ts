import { Context } from "hono";
import { SettingsRepository } from "../repositories/settingsRepo";
import { SettingsValidator } from "@/src/shared/validations/validators/settings.validator";
import { HTTPException } from "hono/http-exception";

export class SettingsController {
  // Get user settings
  static async getSettings(c: Context) {
    try {
      const userId = c.get("userId");
      console.log("setting controller received a request")

      // Try to get existing settings, create if not exists
      let userSettings = await SettingsRepository.getUserSettings(userId);

      // If no settings exist, create initial settings
      if (!userSettings) {
        userSettings = await SettingsRepository.createInitialSettings(userId);
      }

      return c.json({
        status: "success",
        data: userSettings,
      });
    } catch (err) {
      console.error("Error fetching settings:", err);
      throw new HTTPException(500, { message: "Failed to fetch settings" });
    }
  }

  // Update user settings
  static async updateSettings(c: Context) {
    try {
      const userId = c.get("userId");
      console.log("setting update controller received a request");
      // Validate input
      const validatedData = await SettingsValidator.validateUpdate(c);
      console.log('validated setting data from controller :', JSON.stringify(validatedData));

      // Update settings
      const updatedSettings = await SettingsRepository.updateSettings(userId, {
        ...(validatedData.darkmode !== undefined && {
          darkmode: validatedData.darkmode,
        }),
        ...(validatedData.defaultCyclesNumber && {
          defaultCyclesNumber: validatedData.defaultCyclesNumber,
        }),
        ...(validatedData.defaultFocusDuration && {
          defaultFocusDuration: validatedData.defaultFocusDuration,
        }),
        ...(validatedData.defaultBreakDuration && {
          defaultBreakDuration: validatedData.defaultBreakDuration,
        }),
        ...(validatedData.defaultLongBreakDuration && {
          defaultLongBreakDuration: validatedData.defaultLongBreakDuration,
        }),
      });

      return c.json({
        status: "success",
        data: updatedSettings,
      });
    } catch (err) {
      console.error("Error updating settings:", err);
      throw new HTTPException(500, { message: "Failed to update settings" });
    }
  }
}
