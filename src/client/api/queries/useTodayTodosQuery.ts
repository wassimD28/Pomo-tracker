import { API_ENDPOINTS } from "@/src/shared/constant/endpoints"
import { ApiResponse, Task } from "@/src/shared/types/interfaces/common.interface"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useTodayTodosQuery = () =>{
  return useQuery<ApiResponse<Task>>({
    queryKey: ["todayTodos"],
    queryFn: async () => {
      const response = await axios.get(API_ENDPOINTS.TASKS.TODAY_TODOS);
      return response.data as ApiResponse<Task>;
    },
    refetchInterval: 60000,
    staleTime: 1000 * 60 * 5,
  });
}