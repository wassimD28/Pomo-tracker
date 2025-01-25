import { Context } from "hono";
import { SettingsRepository } from "../repositories/settingsRepo";
import { SettingsValidator } from "@/src/shared/validations/validators/settings.validator";
import { HTTPException } from "hono/http-exception";

export class SettingsController {
  // Get user settings
  static async getSettings(c: Context) {
    try {
      const userId = c.get("userId");

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

      // Validate input
      const validatedData = await SettingsValidator.validateUpdate(c);

      // Update settings
      const updatedSettings = await SettingsRepository.updateSettings(
        userId,
        validatedData,
      );

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
