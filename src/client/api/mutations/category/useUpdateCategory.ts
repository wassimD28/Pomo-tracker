import { API_ENDPOINTS } from "@/src/shared/constant/endpoints";
import { ApiResponse, Category } from "@/src/shared/types/interfaces/common.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useUpdateCategory = (
  setIsEditing: (isEditing: boolean) => void,
  setName: (name: string) => void,
  category: Category,
) => {
  const queryClient = useQueryClient();
  return useMutation({
      mutationFn: async (categoryName: string) => {
        const response = await axios.put(API_ENDPOINTS.CATEGORIES.BY_ID(category.id), {
          name: categoryName,
        });
        return response.data;
      },
      onMutate: async (newCategoryName) => {
        await queryClient.cancelQueries({ queryKey: ["categories"] });
        const previousCategories = queryClient.getQueryData<ApiResponse<Category>>(["categories"]);
  
        queryClient.setQueryData<ApiResponse<Category>>(["categories"], (old) => {
          if (!old) return { status: "success", data: [] };
          return {
            ...old,
            data: old.data.map((cat) =>
              cat.id === category.id ? { ...cat, name: newCategoryName } : cat,
            ),
          };
        });
  
        setIsEditing(false);
        return { previousCategories };
      },
      onError: (err, newCategory, context) => {
        if (context?.previousCategories) {
          queryClient.setQueryData(["categories"], context.previousCategories);
        }
        setName(category.name); // Reset to original name on error
        console.error("Failed to update category:", err);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      },
    });
}