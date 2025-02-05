// src/client/api/queries/usePomodoroSessionQuery.ts
import { API_ENDPOINTS } from "@/src/shared/constant/endpoints";
import {
  ApiResponse,
} from "@/src/shared/types/interfaces/common.interface";
import { PomodoroSession } from "@/src/shared/types/interfaces/pomodoro.interface";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const usePomodoroSessionQuery = () => {
  return useQuery({
    queryKey: ["pomodoroSessions"],
    queryFn: async () => {
      const response = await axios.get(API_ENDPOINTS.POMODORO_SESSION.BASE);
      return response.data as ApiResponse<PomodoroSession>;
    },
    // Cache data for 5 minutes and refetch every minute.
    staleTime: 5 * 60 * 1000,
    refetchInterval: 60 * 1000,
  });
};
