import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TaskComponent } from "../types/interfaces/taskComp.interface";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// For minutes to MM:SS format
export const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const formattedTime =
    hours > 0
      ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
      : `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  return formattedTime;
};


// get the latest order of a task components array
export const getLatestOrder = (taskComponents : TaskComponent[] | undefined) => {
  let latestOrder = 0;
  if (taskComponents && taskComponents.length > 0) {
    latestOrder = Math.max(...taskComponents.map((tc) => tc.order));
  }
  return latestOrder;
}

// sort taks component by order
export const sortTaskCompByOrder = (taskComponents: TaskComponent[] | undefined) => {
  if (!taskComponents) return [];
  return taskComponents.sort((a, b) => a.order - b.order);
};

/**convert time from seconds to minutes*/
 export const ToMinutes = (seconds: number) => {
  return Math.round(seconds / 60);
};

/**convert time from minutes to seconds*/
 export const ToSeconds = (minutes: number) => {
  return minutes * 60;
};