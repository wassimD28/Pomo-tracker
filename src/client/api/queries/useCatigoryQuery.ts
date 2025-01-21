import { API_ENDPOINTS } from "@/src/shared/constant/endpoints";
import { ApiResponse, Category } from "@/src/shared/types/interfaces/common.interface";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCategoryQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get(API_ENDPOINTS.CATEGORIES.BASE);
      return response.data as ApiResponse<Category>;
    },
    // Can be cached and automatically refreshed
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchInterval: 60 * 1000, // Refresh every minute
  });
};
