import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// For minutes to MM:SS format
export const formatTime = (seconds: number) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  return format(date, "mm:ss");
};