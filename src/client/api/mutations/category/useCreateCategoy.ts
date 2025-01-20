import { API_ENDPOINTS } from "@/src/shared/constant/endpoints";
import {
  ApiResponse,
  Category,
} from "@/src/shared/types/interfaces/common.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCreateCategory = (
  setName: (name : string) => void,
  setIsOpen: (isOpen : boolean) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (categoryName: string) => {
      const response = await axios.post(API_ENDPOINTS.CATEGORIES.BASE, {
        name: categoryName,
      });
      return response.data;
    },
    onMutate: async (newCategoryName) => {
      // Cancel any outgoing refetches to avoid overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey: ["categories"] });

      // Snapshot the previous value
      const previousCategories = queryClient.getQueryData<
        ApiResponse<Category>
      >(["categories"]);

      // Create a temporary ID for the optimistic update
      const tempId = Date.now();

      // Optimistically update the categories by adding the new one
      queryClient.setQueryData<ApiResponse<Category>>(["categories"], (old) => {
        // If there's no existing data, create initial state
        if (!old)
          return {
            status: "success",
            data: [{ id: tempId, name: newCategoryName }],
          };
        // Otherwise, add the new category to the existing data
        return {
          ...old,
          data: [...old.data, { id: tempId, name: newCategoryName }],
        };
      });

      // Reset form and close dialog immediately for better UX
      setName("");
      setIsOpen(false);

      // Return the snapshot so we can rollback if something goes wrong
      return { previousCategories };
    },
    onError: (err, newCategory, context) => {
      // If the mutation fails, use the context we saved to roll back
      if (context?.previousCategories) {
        queryClient.setQueryData(["categories"], context.previousCategories);
      }
      console.error("Failed to create category:", err);
      // You might want to reopen the dialog here
      setIsOpen(true);
    },
    onSettled: () => {
      // Always refetch after error or success to ensure our local data is correct
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
