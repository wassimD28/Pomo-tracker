/**
 * Interface representing a Pomodoro Session.
 */
export interface PomodoroSession {
  /**
   * The name of the task associated with the Pomodoro session.
   */
  taskName: string;

  /**
   * The length of the work session in minutes (default: 25 minutes).
   */
  sessionDuration: number;

  /**
   * The length of the short break in minutes (default: 5 minutes).
   */
  breakDuration: number;

  /**
   * The length of the long break in minutes (default: 15 minutes).
   */
  longBreakDuration: number;

  /**
   * The number of Pomodoro cycles before a long break (default: 4).
   */
  cycles: number;

  /**
   * The current cycle number within a session.
   */
  currentCycle: number;

  /**
   * The current status of the session (e.g., "working", "short break", "long break", "completed").
   */
  status: string;

  /**
   * The start time of the current session.
   */
  startTime: Date | null;

  /**
   * The end time of the current session.
   */
  endTime: Date | null;

  /**
   * A boolean to indicate if the session is paused.
   */
  isPaused: boolean;

  /**
   * The time elapsed since the session started or resumed.
   */
  elapsedTime: number;

  /**
   * Total time spent in the session, including pauses.
   */
  totalSessionTime: number;

  /**
   * Total time spent on breaks, including pauses.
   */
  totalBreakTime: number;

  /**
   * The time at which the session or break was paused.
   */
  pauseTime: Date | null;

  /**
   * Method to start the session.
   */
  startSession(): void;

  /**
   * Method to pause the session.
   */
  pauseSession(): void;

  /**
   * Method to resume the session from pause.
   */
  resumeSession(): void;

  /**
   * Method to end the session.
   */
  endSession(): void;

  /**
   * Method to start the break.
   */
  startBreak(): void;

  /**
   * Method to end the break and transition to the next cycle.
   */
  endBreak(): void;
}
