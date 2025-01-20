import { API_ENDPOINTS } from "@/src/shared/constant/endpoints";
import { ApiResponse, Category } from "@/src/shared/types/interfaces/common.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryId: number) => {
      const response = await axios.delete(
        API_ENDPOINTS.CATEGORIES.BY_ID(categoryId),
      );
      return response.data;
    },
    onMutate: async (categoryId) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });
      const previousCategories = queryClient.getQueryData<ApiResponse<Category>>(["categories"]);

      queryClient.setQueryData<ApiResponse<Category>>(["categories"], (old) => {
        if (!old) return { status: "success", data: [] };
        return {
          ...old,
          data: old.data.filter((cat) => cat.id !== categoryId),
        };
      });

      return { previousCategories };
    },
    onError: (err, categoryId, context) => {
      if (context?.previousCategories) {
        queryClient.setQueryData(["categories"], context.previousCategories);
      }
      console.error("Error deleting category:", err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
