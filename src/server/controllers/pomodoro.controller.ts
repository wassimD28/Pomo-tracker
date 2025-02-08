import { Context } from "hono";
import { PomodoroSessionRepository } from "../repositories/pomodoroRepo";
import { HTTPException } from "hono/http-exception";
import { PomodoroSessionValidator } from "@/src/shared/validations/validators/pomodoro.validator";

export class PomodoroSessionController {
  static async linkTask(c: Context) {
    try {
      const userId = c.get("userId");
      const { sessionId, taskId } =
        await PomodoroSessionValidator.validateLinkTask(c);

      // Fetch the session to ensure it belongs to the user
      const session = await PomodoroSessionRepository.getSessionById(sessionId);
      if (!session || session.userId !== userId) {
        throw new HTTPException(404, {
          message: "Session not found or unauthorized",
        });
      }

      // Link or unlink the task
      const updatedSession = await PomodoroSessionRepository.updateSession(
        sessionId,
        {
          targetTaskId: taskId, // Pass `null` to unlink
        },
      );

      return c.json({ status: "success", data: updatedSession });
    } catch (err) {
      console.error("Error linking/unlinking task:", err);
      throw new HTTPException(500, { message: "Failed to link/unlink task" });
    }
  }
  static async create(c: Context) {
    try {
      const userId = c.get("userId");
      const validatedData = await PomodoroSessionValidator.validateCreate(c);

      const newSession = await PomodoroSessionRepository.createSession({
        ...validatedData,
        targetTaskId: validatedData.targetTaskId ?? null,
        userId,
      });

      return c.json({ status: "success", data: newSession });
    } catch (err) {
      console.error("Error creating session:", err);
      throw new HTTPException(500, { message: "Failed to create session" });
    }
  }

  static async getUserSessions(c: Context) {
    try {
      const userId = c.get("userId");
      const sessions = await PomodoroSessionRepository.getUserSessions(userId);
      return c.json({ status: "success", data: sessions });
    } catch (err) {
      console.error("Error fetching sessions:", err);
      throw new HTTPException(500, { message: "Failed to fetch sessions" });
    }
  }

  static async getTodayUserSessions(c: Context) {
    try {
      const userId = c.get("userId");
      const sessions = await PomodoroSessionRepository.getTodayUserSessions(userId);
      return c.json({ status: "success", data: sessions });
    } catch (err) {
      console.error("Error fetching today sessions:", err);
      throw new HTTPException(500, { message: "Failed to fetch today sessions" });
    }
  }
  

  static async getSession(c: Context) {
    try {
      const sessionId = parseInt(c.req.param("id"));
      const session = await PomodoroSessionRepository.getSessionById(sessionId);
      return c.json({ status: "success", data: session });
    } catch (err) {
      console.error("Error fetching session:", err);
      throw new HTTPException(500, { message: "Failed to fetch session" });
    }
  }

  static async update(c: Context) {
    try {
      const sessionId = parseInt(c.req.param("id"));
      const validatedData = await PomodoroSessionValidator.validateUpdate(c);

      const updatedSession = await PomodoroSessionRepository.updateSession(
        sessionId,
        validatedData,
      );

      return c.json({ status: "success", data: updatedSession });
    } catch (err) {
      console.error("Error updating session:", err);
      throw new HTTPException(500, { message: "Failed to update session" });
    }
  }

  static async delete(c: Context) {
    try {
      const sessionId = parseInt(c.req.param("id"));
      await PomodoroSessionRepository.deleteSession(sessionId);
      return c.json({ status: "success", message: "Session deleted" });
    } catch (err) {
      console.error("Error deleting session:", err);
      throw new HTTPException(500, { message: "Failed to delete session" });
    }
  }
}
