import { API_ENDPOINTS } from "@/src/shared/constant/endpoints";
import {
  ApiResponse,
} from "@/src/shared/types/interfaces/common.interface";
import { TaskComponent } from "@/src/shared/types/interfaces/taskComp.interface";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useTaskCompQuery = (taskId: number | null) => {
  return useQuery<ApiResponse<TaskComponent>>({
    queryKey: ["taskComp", taskId],
    queryFn: async () => {
      console.log("Making request for taskId:", taskId);
      if (!taskId) {
        return { status: "success", data: [] };
      }

      const response = await axios.get(
        API_ENDPOINTS.TASK_COMPONENTS.BY_TASK_ID(taskId),
      );
      return response.data as ApiResponse<TaskComponent>;
    },
    enabled: !!taskId,
    refetchInterval: 60000,
    staleTime: 1000 * 60 * 5,
  });
};
