import { db } from "@/src/server/db/drizzle";
import { settings } from "@/src/server/db/schema";
import { eq } from "drizzle-orm";

interface UpdateSettingsParams {
  darkmode?: boolean;
  defaultFocusDuration?: number;
  defaultBreakDuration?: number;
  defaultLongBreakDuration?: number;
  defaultCyclesNumber?: number;
}

export class SettingsRepository {
  // Get user settings
  static async getUserSettings(userId: number) {
    try {
      const userSettings = await db
        .select()
        .from(settings)
        .where(eq(settings.userId, userId))
        .then((res) => res[0]);

      return userSettings;
    } catch (err) {
      console.error("Failed to get user settings:", err);
      throw err;
    }
  }

  // Create initial settings for a new user
  static async createInitialSettings(userId: number) {
    try {
      const [newSettings] = await db
        .insert(settings)
        .values({ userId })
        .returning();

      return newSettings;
    } catch (err) {
      console.error("Failed to create initial settings:", err);
      throw err;
    }
  }

  // Update user settings
  static async updateSettings(userId: number, params: UpdateSettingsParams) {
    try {
      const [updatedSettings] = await db
        .update(settings)
        .set(params)
        .where(eq(settings.userId, userId))
        .returning();

      return updatedSettings;
    } catch (err) {
      console.error("Failed to update settings:", err);
      throw err;
    }
  }
}
