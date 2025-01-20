import { API_ENDPOINTS } from "@/src/shared/constant/endpoints";
import {
  ApiResponse,
  Task,
} from "@/src/shared/types/interfaces/common.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteTask = (task: Task) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axios.delete(API_ENDPOINTS.TASKS.BY_ID(task.id));
      return response.data;
    },

    onMutate: async () => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({
        queryKey: ["tasks", task.categoryId], // Match the query key structure
      });

      // Snapshot the previous value
      const previousTasks = queryClient.getQueryData<ApiResponse<Task>>([
        "tasks",
        task.categoryId, // Match the query key structure
      ]);

      // Optimistically update the cache
      queryClient.setQueryData<ApiResponse<Task>>(
        ["tasks", task.categoryId], // Match the query key structure
        (old) => {
          if (!old) return { status: "success", data: [] };
          return {
            ...old,
            data: old.data.filter((t) => t.id !== task.id),
          };
        },
      );

      // Return a context object with the snapshotted value
      return { previousTasks };
    },

    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousTasks) {
        queryClient.setQueryData(
          ["tasks", task.categoryId], // Match the query key structure
          context.previousTasks,
        );
      }
      console.error("Failed to delete task:", err);
    },

    // Even on success, we should invalidate the query to ensure our cache is in sync
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", task.categoryId], // Match the query key structure
      });
    },
  });
};
