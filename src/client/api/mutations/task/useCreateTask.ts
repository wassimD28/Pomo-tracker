import { API_ENDPOINTS } from "@/src/shared/constant/endpoints";
import {
  ApiResponse,
  Task,
} from "@/src/shared/types/interfaces/common.interface";
import { TaskCreatePayload } from "@/src/shared/types/interfaces/task.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCreateTask = (
  setTaskData: (categoryData: TaskCreatePayload) => void,
  setIsOpen: (isOpen: boolean) => void,
  categoryId: number | null,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (task: TaskCreatePayload) => {
      const response = await axios.post(API_ENDPOINTS.TASKS.BASE, {
        title: task.title,
        categoryId: task.categoryId,
      });
      return response.data;
    },
    onMutate: async (task) => {
      // Cancel queries with the correct query key that includes categoryId
      await queryClient.cancelQueries({
        queryKey: ["tasks", task.categoryId],
      });

      const previousTasks = queryClient.getQueryData<ApiResponse<Task>>([
        "tasks",
        task.categoryId, // Include categoryId in the key
      ]);

      const newTask = {
        id: Date.now(),
        title: task.title,
        categoryId: task.categoryId,
        isCompleted: false,
        inTodayTodos: false,
      };

      // Update the cache with the correct query key
      queryClient.setQueryData<ApiResponse<Task>>(
        ["tasks", task.categoryId],
        (old) => ({
          status: "success",
          data: old ? [...old.data, newTask] : [newTask],
        }),
      );

      setTaskData({ categoryId: categoryId || 0, title: "" });
      setIsOpen(false);

      return { previousTasks };
    },
    onError: (err, newTask, context) => {
      if (context?.previousTasks) {
        // Restore with the correct query key
        queryClient.setQueryData(
          ["tasks", newTask.categoryId],
          context.previousTasks,
        );
      }
      console.error("Failed to create task:", err);
      setIsOpen(true);
    },
    onSettled: (data, error, variables) => {
      // Invalidate with the correct query key
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.categoryId],
      });
    },
  });
};
