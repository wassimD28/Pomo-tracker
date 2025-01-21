import { ContentType } from '@/src/shared/types/enum/common.enum';
import { API_ENDPOINTS } from "@/src/shared/constant/endpoints";
import { ApiResponse } from "@/src/shared/types/interfaces/common.interface";
import {
  TaskCompCreatePayload,
  TaskComponent,
} from "@/src/shared/types/interfaces/taskComp.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCreateTaskComp = (
  setTaskCompData: (data: TaskCompCreatePayload) => void,
  setIsOpen: (isOpen: boolean) => void,
  
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (taskComp: TaskCompCreatePayload) => {
      console.log("taskComp.taskId :", taskComp.taskId);
      const response = await axios.post(API_ENDPOINTS.TASK_COMPONENTS.BASE, {
        taskId: taskComp.taskId,
        order: taskComp.order,
        content: taskComp.content,
        type: taskComp.type,
      });
      return response.data as ApiResponse<TaskComponent>;
    },
    onMutate: async (taskComp: TaskCompCreatePayload) => {
      await queryClient.cancelQueries({
        queryKey: ["taskComp", taskComp.taskId],
      });

      const previousTaskComps = queryClient.getQueryData<
        ApiResponse<TaskComponent>
      >(["taskComp", taskComp.taskId]);

      const newTaskComp = {
        id: Date.now(),
        taskId: taskComp.taskId,
        order: taskComp.order,
        content: taskComp.content,
        type: taskComp.type,
      };

      // update the cached task components
      queryClient.setQueryData<ApiResponse<TaskComponent>>(
        ["taskComp", taskComp.taskId],
        (old) => ({
          status: "success",
          data: old ? [...old.data, newTaskComp] : [newTaskComp],
        }),
      );
      setTaskCompData({
        content: "",
        type: ContentType.text,
        order: 0,
        taskId: 0,
      });
      setIsOpen(false);

      return { previousTaskComps };
    },
    onError: (err, newTaskComp: TaskCompCreatePayload, context) => {
      if (context?.previousTaskComps) {
        queryClient.setQueryData(
          ["taskComps", newTaskComp.taskId],
          context.previousTaskComps,
        );
      }
      console.error("Failed to create task component:", err);
      setIsOpen(false);
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["taskComp", variables.taskId],
      });
    },
  });
};
