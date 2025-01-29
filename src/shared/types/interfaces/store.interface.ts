import { PomoSession, Task } from "./common.interface";
import { PomoSessionData } from "./pomodoro.interface";

export interface PomoStore {
  pomoSession: PomoSession;
  skipCounting: () => void;
  completePomoSession: () => void;
  endBreakDuration: () => void;
  startFocus: () => void;
  skipBreakDuration: () => void;
  updateCurrentCycle: () => void;
  resetPomoSession: () => void;
  endFocusSession: () => void;
  setPomoSessionData: (data: PomoSessionData) => void;
  startBreakSession: () => void;
  startPomoSession: () => void;
  pausePomoSession: () => void;
  resumePomoSession: () => void;
  endPomoSession: () => void;
  updateRemainingTime: (remainingTime: number) => void;
}

export interface CheckListStore {
  checklists: Task[];
  addTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  toggleTaskCompletion: (taskId: string) => void;
  updateTask: (taskId: string, updatedTask: Task) => void;
}
