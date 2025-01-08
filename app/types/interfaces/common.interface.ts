import { LucideIcon } from "lucide-react";

export interface Link{
  href: string;
  isActive: boolean;
  icon: LucideIcon
}

export interface Task {
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PomoSession {
  target: Task | null;
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


export interface Category{
  id: number;
  name: string;
  icon: string;
}