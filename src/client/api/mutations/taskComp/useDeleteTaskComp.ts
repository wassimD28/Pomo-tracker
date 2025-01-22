import { API_ENDPOINTS } from "@/src/shared/constant/endpoints";
import { ApiResponse } from "@/src/shared/types/interfaces/common.interface";
import { TaskComponent } from "@/src/shared/types/interfaces/taskComp.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteTaskComp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (taskComp: TaskComponent) => {
      const response = await axios.delete(
        API_ENDPOINTS.TASK_COMPONENTS.BY_ID(taskComp.id),
      );
      return response.data;
    },
    onMutate: async (taskComp) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({
        queryKey: ["taskComp", taskComp.taskId], // Match the query key structure
      });
      // Snapshot the previous value
      const previousTaskComps = queryClient.getQueryData<
        ApiResponse<TaskComponent>
      >(["taskComp", taskComp.taskId]);
      // Optimistically update the cache
      queryClient.setQueryData<ApiResponse<TaskComponent>>(
        ["taskComp", taskComp.taskId],
        (old) => {
          if (!old) return { status: "success", data: [] };
          return {
            ...old,
            data: old.data.filter((tc) => tc.id !== taskComp.id),
          };
        },
      );
      // Return the new data to the calling function
      return { previousTaskComps };
    },
    onError: (err, taskComp, context) => {
      if (context?.previousTaskComps) {
        queryClient.setQueryData(
          ["taskComp", taskComp.taskId],
          context.previousTaskComps,
        );
      }
      console.error("Error deleting task component:", err);
    }
  });
};
