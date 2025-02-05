import { db } from "@/src/server/db/drizzle";
import { pomodoroSessions } from "@/src/server/db/schema";
import { eq } from "drizzle-orm";

interface CreateSessionParams {
  userId: number;
  targetTaskId: number | null;
  focusDuration: number;
  cyclesNumber: number;
  breakDuration: number;
  longBreakDuration: number;
  wastedTime: number;
  doneCycles?: number; // New field
  totalSessionDuration?: number; // New field
  totalFocusDuration?: number; // New field
  totalBreakDuration?: number; // New field
  isEnded?: boolean; // New field
  pausedAt?: Date[];
  resumedAt?: Date[];
  startedAt?: Date;
  endedAt?: Date;
  isCompleted?: boolean;
}

interface UpdateSessionParams {
  wastedTime?: number;
  doneCycles?: number; // New field
  totalSessionDuration?: number; // New field
  totalFocusDuration?: number; // New field
  totalBreakDuration?: number; // New field
  isEnded?: boolean; // New field
  pausedAt?: Date[];
  resumedAt?: Date[];
  endedAt?: Date | null;
  isCompleted?: boolean;
  targetTaskId?: number | null; // Add this line
}

interface LinkTaskParams {
  sessionId: number;
  taskId: number | null; // `null` to unlink
}

export class PomodoroSessionRepository {
  static async linkTask(params: LinkTaskParams) {
    try {
      const [updatedSession] = await db
        .update(pomodoroSessions)
        .set({ targetTaskId: params.taskId })
        .where(eq(pomodoroSessions.id, params.sessionId))
        .returning();
      return updatedSession;
    } catch (err) {
      console.error("Failed to link/unlink task:", err);
      throw err;
    }
  }

  static async createSession(params: CreateSessionParams) {
    try {
      const [newSession] = await db
        .insert(pomodoroSessions)
        .values({
          ...params,
          targetTaskId: params.targetTaskId || null,
          doneCycles: params.doneCycles || 0, // Default value
          totalSessionDuration: params.totalSessionDuration || 0, // Default value
          totalFocusDuration: params.totalFocusDuration || 0, // Default value
          totalBreakDuration: params.totalBreakDuration || 0, // Default value
          isEnded: params.isEnded || false, // Default value
          pausedAt: params.pausedAt || [],
          resumedAt: params.resumedAt || [],
          isCompleted: params.isCompleted || false,
        })
        .returning();
      return newSession;
    } catch (err) {
      console.error("Failed to create session:", err);
      throw err;
    }
  }

  static async getUserSessions(userId: number) {
    try {
      return await db
        .select()
        .from(pomodoroSessions)
        .where(eq(pomodoroSessions.userId, userId));
    } catch (err) {
      console.error("Failed to get sessions:", err);
      throw err;
    }
  }

  static async getSessionById(sessionId: number) {
    try {
      const [session] = await db
        .select()
        .from(pomodoroSessions)
        .where(eq(pomodoroSessions.id, sessionId));
      return session;
    } catch (err) {
      console.error("Failed to get session:", err);
      throw err;
    }
  }

  static async updateSession(sessionId: number, params: UpdateSessionParams) {
    try {
      const [updatedSession] = await db
        .update(pomodoroSessions)
        .set({
          // Explicitly update array fields if present
          pausedAt: params.pausedAt !== undefined ? params.pausedAt : undefined,
          resumedAt:
            params.resumedAt !== undefined ? params.resumedAt : undefined,
          // Handle other fields
          wastedTime: params.wastedTime,
          doneCycles: params.doneCycles,
          totalSessionDuration: params.totalSessionDuration,
          totalFocusDuration: params.totalFocusDuration,
          totalBreakDuration: params.totalBreakDuration,
          isEnded: params.isEnded,
          endedAt: params.endedAt,
          isCompleted: params.isCompleted,
          targetTaskId: params.targetTaskId,
        })
        .where(eq(pomodoroSessions.id, sessionId))
        .returning();
      return updatedSession;
    } catch (err) {
      console.error("Failed to update session:", err);
      throw err;
    }
  }

  static async deleteSession(sessionId: number) {
    try {
      const [deletedSession] = await db
        .delete(pomodoroSessions)
        .where(eq(pomodoroSessions.id, sessionId))
        .returning();
      return deletedSession;
    } catch (err) {
      console.error("Failed to delete session:", err);
      throw err;
    }
  }
}
