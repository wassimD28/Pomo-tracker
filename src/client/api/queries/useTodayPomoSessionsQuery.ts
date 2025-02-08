import { API_ENDPOINTS } from "@/src/shared/constant/endpoints";
import { ApiResponse, PomodoroSessionWithDetails } from "@/src/shared/types/interfaces/common.interface";
import { useQuery } from "@tanstack/react-query"
import axios from "axios";

export const useTodaySessions  = () => {
  return useQuery({
    queryKey: ["todayPomodoroSessions"],
    queryFn: async () => {
      const response = await axios.get(API_ENDPOINTS.POMODORO_SESSION.TODAY);
      return response.data as ApiResponse<PomodoroSessionWithDetails>;
    },
    // Cache data for 5 minutes and refetch every minute.
    staleTime: 5 * 60 * 1000,
    refetchInterval: 60 * 1000,
  });
}