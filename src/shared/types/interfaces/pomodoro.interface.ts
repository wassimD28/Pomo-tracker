export interface PomoSessionData {
  cyclesNumber: number;
  focusDuration: number;
  breakDuration: number;
  longBreakDuration: number;
}

export interface PomodoroSession {
  id: number; // Primary key, auto-incremented
  userId: number; // References the `users` table
  targetTaskId: number | null; // References the `tasks` table, nullable
  focusDuration: number; // Duration of focus in seconds
  cyclesNumber: number; // Number of Pomodoro cycles
  breakDuration: number; // Duration of short breaks in seconds
  longBreakDuration: number; // Duration of long breaks in seconds
  wastedTime: number; // Time wasted during the session in seconds
  pausedAt: Date[]; // Array of timestamps when the session was paused
  resumedAt: Date[]; // Array of timestamps when the session was resumed
  startedAt: Date | null; // Timestamp when the session started, nullable
  endedAt: Date | null; // Timestamp when the session ended, nullable
  isCompleted: boolean; // Whether the session is completed
  isEnded: boolean; // Whether the session is ended
  createdAt: Date; // Timestamp when the record was created
  updatedAt: Date; // Timestamp when the record was last updated
}

export interface CreateSessionParams {
  userId: number;
  targetTaskId?: number;
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
