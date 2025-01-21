import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { TaskComponent } from "../types/interfaces/taskComp.interface";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// For minutes to MM:SS format
export const formatTime = (seconds: number) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  return format(date, "mm:ss");
};

// get the latest order of a task components array
export const getLatestOrder = (taskComponents : TaskComponent[] | undefined) => {
  let latestOrder = 0;
  if (taskComponents && taskComponents.length > 0) {
    latestOrder = Math.max(...taskComponents.map((tc) => tc.order));
  }
  return latestOrder + 1;
}

// sort taks component by order
export const sortTaskCompByOrder = (taskComponents: TaskComponent[] | undefined) => {
  if (!taskComponents) return [];
  return taskComponents.sort((a, b) => a.order - b.order);
};