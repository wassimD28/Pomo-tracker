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

// Format seconds into a natural time format
// If there are hours: "X hours and Y minutes"
// If no hours: "Y minutes"
export const formatToNaturalTime = (totalSeconds: number): string => {
  // First convert seconds to minutes, rounding down to handle partial minutes
  const totalMinutes = Math.floor(totalSeconds / 60);
  
  // Handle edge case of zero or negative time
  if (totalMinutes <= 0) return "0 minutes";
  
  // Calculate hours and remaining minutes
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  // If we have no hours, just return the minutes
  if (hours === 0) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
  }
  
  // If we have hours but no minutes, just return the hours
  if (minutes === 0) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  }
  
  // If we have both hours and minutes, return the full format
  return `${hours} ${hours === 1 ? 'hour' : 'hours'} and ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
};
export const toTimeWithLetters = (totalSeconds: number): string => {
  // First convert seconds to minutes, rounding down to handle partial minutes
  const totalMinutes = Math.floor(totalSeconds / 60);
  
  // Handle edge case of zero or negative time
  if (totalMinutes <= 0) return "0m";
  
  // Calculate hours and remaining minutes
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  // If we have no hours, just return the minutes
  if (hours === 0) {
    return `${minutes}m`;
  }
  
  // If we have hours but no minutes, just return the hours
  if (minutes === 0) {
    return `${hours}h`;
  }
  
  // If we have both hours and minutes, return the full format
  return `${hours}h ${minutes}m`;
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