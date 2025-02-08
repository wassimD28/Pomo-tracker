import { LucideIcon } from "lucide-react";

export interface ApiResponse<T> {
  status: string;
  data: T[];
}

export interface Link {
  name: string;
  href: string;
  isActive: boolean;
  icon: LucideIcon;
}

export interface Task {
  id: number;
  categoryId: number;
  title: string;
  inTodayTodos: boolean;
  isCompleted: boolean;
}

export interface FoundTask{
  id: number
  title: string
  createdAt : Date
  updatedAt : Date
  category:{
    id: number
    name : number
  }
}

export interface PomoSession {
  id: number | null;
  target: FoundTask | null;
  cyclesNumber: number;
  currentCycle: number;
  totalSessionDuration: number; // in seconds
  focusDuration: number; // in seconds
  breakDuration: number; // in seconds
  longBreakDuration: number; // in seconds
  remainingTime: number; // in seconds
  wastedTime: number; // in seconds
  currentFocusDuration: number; // in seconds
  currentBreakDuration: number; // in seconds
  totalFocusDuration: number; // in seconds
  totalBreakDuration: number; // in seconds
  skipCounting: boolean;
  isBreakSkipped: boolean;
  pausedAt: Date[];
  resumedAt: Date[];
  isBreakComplete: boolean;
  isFocusComplete: boolean;
  isPaused: boolean;
  isStarted: boolean;
  isEnded: boolean;
  isBreak: boolean;
  isFocus: boolean;
  isCompleted: boolean;
  startedAt: Date | null;
  endedAt: Date | null;
}

export interface Category {
  id: number;
  name: string;
}

export interface Setting {
  darkmode: boolean;
  defaultCyclesNumber: number;
  defaultFocusDuration: number;
  defaultBreakDuration: number;
  defaultLongBreakDuration: number;
}
// Interface for Task with nested Category
export interface TaskWithCategory {
  id: number;
  userId: number;
  categoryId: number;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  category: Category; // Nested category object
}

// Comprehensive Pomodoro Session Interface
export interface PomodoroSessionWithDetails {
  session: {
    id: number;
    userId: number;
    targetTaskId: number | null;
    focusDuration: number;
    cyclesNumber: number;
    breakDuration: number;
    longBreakDuration: number;
    wastedTime: number;
    pausedAt: Date[];
    resumedAt: Date[];
    startedAt: Date | null;
    endedAt: Date | null;
    isCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    doneCycles: number;
    totalSessionDuration: number;
    totalFocusDuration: number;
    totalBreakDuration: number;
    isEnded: boolean;
  };
  task: TaskWithCategory | null; // Nullable in case no task is associated
}