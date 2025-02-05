import { API_ENDPOINTS } from "@/src/shared/constant/endpoints";
import { ApiResponse } from "@/src/shared/types/interfaces/common.interface";
import {
  PomodoroSession,
} from "@/src/shared/types/interfaces/pomodoro.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeletePomodoroSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (sessionId: number) => {
      const response = await axios.delete(
        API_ENDPOINTS.POMODORO_SESSION.BY_ID(sessionId),
      );
      return response.data;
    },
    onMutate: async (sessionId) => {
      await queryClient.cancelQueries({ queryKey: ["pomodoroSessions"] });
      const previousSessions = queryClient.getQueryData<
        ApiResponse<PomodoroSession>
      >(["pomodoroSessions"]);
      queryClient.setQueryData<ApiResponse<PomodoroSession>>(
        ["pomodoroSessions"],
        (old) => {
          if (!old) return { status: "success", data: [] };
          return {
            ...old,
            data: old.data.filter((s) => s.id !== sessionId),
          };
        },
      );
      return { previousSessions };
    },
    onError: (err, sessionId, context) => {
      if (context?.previousSessions) {
        queryClient.setQueryData(
          ["pomodoroSessions"],
          context.previousSessions,
        );
      }
      console.error("Error deleting pomodoro session:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["pomodoroSessions"] });
    },
  });
};
