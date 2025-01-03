export interface PomoStore {
  pomoSession: PomoSession;
  startPomoSession: (duration: number, breakDuration: number) => void;
  pausePomoSession: () => void;
  resumePomoSession: () => void;
  endPomoSession: () => void;
  updateRemainingTime: (remainingTime: number) => void;
}

export interface Note {
  title: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PomoSession {
  target: Note | null;
  duration: number; // in seconds
  remainingTime?: number; // in seconds 
  breakDuration: number; // in seconds
  pausedAt: Date[] | null;
  resumedAt: Date[] | null;
  isPaused: boolean;
  isStarted: boolean;
  isCompleted: boolean;
  startedAt: Date | null;
  endedAt: Date | null;
}
