import { API_ENDPOINTS } from "@/src/shared/constant/endpoints";
import { ApiResponse, Task } from "@/src/shared/types/interfaces/common.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useUpdateTask = (
  setUpdatedTask : (task : Task) => void,
  setIsEditing : (isEditing : boolean) => void,
  task : Task,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newTaskValue: Task) => {
      const response = await axios.put(API_ENDPOINTS.TASKS.BY_ID(task.id), {
        categoryId: newTaskValue.categoryId,
        title: newTaskValue.title,
        isCompleted: newTaskValue.isCompleted,
        inTodayTodos: newTaskValue.inTodayTodos,
      });
      return response.data;
    },
    onMutate: async (newTaskValue) => {
      await queryClient.cancelQueries({ queryKey: ["tasks", task.categoryId] });
      const previousTasks = queryClient.getQueryData<ApiResponse<Task>>(["tasks", task.categoryId]);

      queryClient.setQueryData<ApiResponse<Task>>(
        ["tasks", task.categoryId],
        (old) => {
          if (!old) return { status: "success", data: [] };
          return {
            ...old,
            data: old.data.map((oldTask) =>
              oldTask.id === task.id ? newTaskValue : oldTask,
            ),
          };
        },
      );

      return { previousTasks };
    },
    onError: (err, newTaskValue, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(
          ["tasks", task.categoryId],
          context.previousTasks,
        );
      }
      setUpdatedTask(task);
      console.error("Failed to update task:", err);
    },
    onSuccess: () => {
      setIsEditing(false);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", task.categoryId] });
    },
  });
}