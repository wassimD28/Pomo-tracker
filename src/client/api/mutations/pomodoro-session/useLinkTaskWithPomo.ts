import { API_ENDPOINTS } from "@/src/shared/constant/endpoints";
import { ApiResponse } from "@/src/shared/types/interfaces/common.interface";
import { PomodoroSession } from "@/src/shared/types/interfaces/pomodoro.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useLinkTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      sessionId,
      taskId,
    }: {
      sessionId: number;
      taskId: number | null;
    }) => {
      const response = await axios.post(
        API_ENDPOINTS.POMODORO_SESSION.LINK_TASK,
        { sessionId, taskId },
      );
      return response.data;
    },
    onMutate: async ({ sessionId, taskId }) => {
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
              s.id === sessionId ? { ...s, targetTaskId: taskId } : s,
            ),
          };
        },
      );
      return { previousSessions };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onError: (err, { sessionId }, context) => {
      if (context?.previousSessions) {
        queryClient.setQueryData(
          ["pomodoroSessions"],
          context.previousSessions,
        );
      }
      console.error("Failed to link/unlink task:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["pomodoroSessions"] });
    },
  });
};
