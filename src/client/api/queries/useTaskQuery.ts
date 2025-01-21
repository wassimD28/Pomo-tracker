import { API_ENDPOINTS } from "@/src/shared/constant/endpoints";
import {
  ApiResponse,
  Task,
} from "@/src/shared/types/interfaces/common.interface";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useTaskQuery = (
  category: { id: number | null; name: string | null }, // this category from zustand store could be null
) => {
  return useQuery<ApiResponse<Task>>({
    queryKey: ["tasks", category.id], // Add category.id to query key
    queryFn: async () => {
      if (!category.id) {
        return { status: "success", data: [] };
      }
      const response = await axios.get(API_ENDPOINTS.TASKS.BY_CATEGORY(category.id));
      return response.data;
    },
    enabled: !!category.id, // Only run query when category.id exists and not null
    refetchInterval: 60000,
    staleTime: 1000 * 60 * 5,
  });
};
