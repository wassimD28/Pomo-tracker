import { API_ENDPOINTS } from "@/src/shared/constant/endpoints";
import { ApiResponse } from "@/src/shared/types/interfaces/common.interface";
import { TaskComponent } from "@/src/shared/types/interfaces/taskComp.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useUpdateTaskComp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (taskComp: TaskComponent) => {
      const response = await axios.put(
        API_ENDPOINTS.TASK_COMPONENTS.BY_ID(taskComp.id),
        {
          taskId: taskComp.taskId,
          order: taskComp.order,
          content: taskComp.content,
          type: taskComp.type,
        }
      );
      return response.data as ApiResponse<TaskComponent>;
    },
    onMutate: async (newTaskComp) => {
      await queryClient.cancelQueries({
        queryKey: ["taskComp", newTaskComp.taskId],
      });
      const previousTaskComps = queryClient.getQueryData<
        ApiResponse<TaskComponent>
      >(["taskComp", newTaskComp.taskId]);

      queryClient.setQueryData<ApiResponse<TaskComponent>>(
        ["taskComp", newTaskComp.taskId],
        (old) => {
          if (!old) return { status: "success", data: [] };
          return {
           ...old,
            data: old.data.map((comp) =>
              comp.id === newTaskComp.id? newTaskComp : comp
            ),
          };
        }
      );
      return { previousTaskComps };
    },
    onError: (err, newTaskComp, context) => {
      if (context?.previousTaskComps) {
        queryClient.setQueryData(
          ["taskComp", newTaskComp.taskId],
          context.previousTaskComps
        );
      }
      console.error("Error updating task component:", err);
    },
  });
};
