import { clsx, type ClassValue } from "clsx";
import { addMinutes, format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// For minutes to MM:SS format
export const formatTime = (minutes: number) => {
  const date = new Date(0);
  const timeWithMinutes = addMinutes(date, minutes);
  return format(timeWithMinutes, "mm:ss");
};