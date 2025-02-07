import { API_ENDPOINTS } from "@/src/shared/constant/endpoints";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useTaskSearchQuery = (searchTerm: string) => {
  return useQuery({
    queryKey: ["tasks", "search", searchTerm],
    queryFn: async () => {
      if (!searchTerm) return [];
      const response = await axios.get(API_ENDPOINTS.TASKS.BY_SEARCH_TERM(searchTerm));
      return response.data.data;
    },
    enabled: !!searchTerm,
    staleTime: 1000 * 60 * 5,
  });
};
