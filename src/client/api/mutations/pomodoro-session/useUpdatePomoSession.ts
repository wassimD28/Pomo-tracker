import { API_ENDPOINTS } from "@/src/shared/constant/endpoints";
import { ApiResponse } from "@/src/shared/types/interfaces/common.interface";
import { PomodoroSession } from "@/src/shared/types/interfaces/pomodoro.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useUpdatePomodoroSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      updatedSession: Partial<PomodoroSession> & { id: number },
    ) => {
      const { id, ...data } = updatedSession;
      const response = await axios.put(
        API_ENDPOINTS.POMODORO_SESSION.BY_ID(id),
        data,
      );
      return response.data;
    },
    onMutate: async (updatedSession) => {
      const { id, ...data } = updatedSession;
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
            data: old.data.map((s) =>
              s.id === id ? { ...s, ...data } : s,
            ),
          };
        },
      );

      return { previousSessions };
    },
    onError: (err, updatedSession, context) => {
      if (context?.previousSessions) {
        queryClient.setQueryData(
          ["pomodoroSessions"],
          context.previousSessions,
        );
      }
      console.error("Failed to update pomodoro session:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["pomodoroSessions"] });
    },
  });
};
