// src/client/api/mutations/pomodoroSession/useCreatePomodoroSession.ts
import { API_ENDPOINTS } from "@/src/shared/constant/endpoints";
import { ApiResponse } from "@/src/shared/types/interfaces/common.interface";
import { PomodoroSession } from "@/src/shared/types/interfaces/pomodoro.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCreatePomodoroSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newSession: Partial<PomodoroSession>) => {
      const response = await axios.post(
        API_ENDPOINTS.POMODORO_SESSION.BASE,
        newSession,
      );
      return response.data;
    },
    onMutate: async (newSession) => {
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: ["pomodoroSessions"] });
      // Snapshot previous sessions
      const previousSessions = queryClient.getQueryData<
        ApiResponse<PomodoroSession>
      >(["pomodoroSessions"]);
      // Assign a temporary ID
      const tempId = Date.now();
      queryClient.setQueryData<ApiResponse<PomodoroSession>>(
        ["pomodoroSessions"],
        (old) => {
          if (!old)
            return {
              status: "success",
              data: [{ id: tempId, ...newSession } as PomodoroSession],
            };
          return {
            ...old,
            data: [
              ...old.data,
              { id: tempId, ...newSession } as PomodoroSession,
            ],
          };
        },
      );
      return { previousSessions };
    },
    onError: (err, newSession, context) => {
      if (context?.previousSessions) {
        queryClient.setQueryData(
          ["pomodoroSessions"],
          context.previousSessions,
        );
      }
      console.error("Failed to create pomodoro session:", err);
      // Optionally, re-open modal or notify the user
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["pomodoroSessions"] });
    },
  });
};
