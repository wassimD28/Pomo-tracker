import { PomoSession, Task } from "./common.interface";

export interface PomoStore {
  pomoSession: PomoSession;
  startPomoSession: (duration: number, breakDuration: number) => void;
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
