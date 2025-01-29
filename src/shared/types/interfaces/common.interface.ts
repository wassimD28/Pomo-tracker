import { LucideIcon } from "lucide-react";

export interface ApiResponse<T> {
  status: string;
  data: T[];
}

export interface Link{
  name: string;
  href: string;
  isActive: boolean;
  icon: LucideIcon
}

export interface Task {
  id: number;
  categoryId: number;
  title: string;
  isCompleted: boolean;
}

export interface PomoSession {
  target: Task | null;
  cyclesNumber: number;
  currentCycle: number;
  focusDuration: number; // in seconds
  breakDuration: number; // in seconds
  longBreakDuration: number; // in seconds
  remainingTime: number; // in seconds
  wastedTime: number;
  skipCounting: boolean;
  pausedAt: Date[];
  resumedAt: Date[];
  isBreakComplete: boolean;
  isFocusComplete: boolean;
  isPaused: boolean;
  isStarted: boolean;
  isEnded: boolean;
  isBreak: boolean;
  isFocus : boolean;
  isCompleted: boolean;
  startedAt: Date | null;
  endedAt: Date | null;
}


export interface Category{
  id: number;
  name: string;
}

export interface Setting{
  darkmode: boolean;
  defaultCyclesNumber: number;
  defaultFocusDuration: number;
  defaultBreakDuration: number;
  defaultLongBreakDuration: number;
}