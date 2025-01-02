export interface PomoStore {
  pomoSession: PomoSession;
  startPomoSession: (
    note: Note,
    duration: number,
    breakDuration: number,
  ) => void;
  pausePomoSession: () => void;
  resumePomoSession: () => void;
  endPomoSession: () => void;
}

export interface Note {
  title: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PomoSession {
  target: Note | null;
  duration: number; // in minutes
  breakDuration: number; // in minutes
  pausedAt: Date[] | null;
  resumedAt: Date[] | null;
  isPaused: boolean;
  startedAt: Date | null;
  endedAt: Date | null;
}
