import { API_ENDPOINTS } from "@/src/shared/constant/endpoints";
import {
  ApiResponse,
  Setting,
} from "@/src/shared/types/interfaces/common.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (settingsPayload: Setting) => {
      try {
        // Log the payload being sent
        console.log("Settings Payload:", settingsPayload);

        const response = await axios.put<ApiResponse<Setting>>(
          API_ENDPOINTS.SETTINGS.BASE,
          {
            darkmode: settingsPayload.darkmode,
            defaultCyclesNumber: settingsPayload.defaultCyclesNumber,
            defaultFocusDuration: settingsPayload.defaultFocusDuration,
            defaultBreakDuration: settingsPayload.defaultBreakDuration,
            defaultLongBreakDuration: settingsPayload.defaultLongBreakDuration,
          },
          {
            // Add error handling configuration
            validateStatus: function (status) {
              return status >= 200 && status < 300; // Default
            },
          },
        );

        return response.data;
      } catch (error) {
        // Detailed error logging
        if (axios.isAxiosError(error)) {
          console.error("Axios Error Details:", {
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers,
            message: error.message,
          });
        }

        // For non-axios errors
        throw error;
      }
    },

    
    onMutate: async () => {
      // Cancel any ongoing queries
      await queryClient.cancelQueries({ queryKey: ["settings"] });

      // Capture previous settings for potential rollback
      const previousSettings = queryClient.getQueryData<ApiResponse<Setting>>([
        "settings",
      ]);

      return { previousSettings };
    },
    // Add onError handler for additional error management
    onError: (error, variables, context) => {
      console.error("Settings Update Error:", error);
      if (context?.previousSettings) {
        queryClient.setQueryData(["settings"], context.previousSettings);
      }
    },

    // Optionally, handle successful mutation
    onSuccess: () => {
      // Invalidate and refetch settings
      

      // Optional: show success toast
      // toast.success('Settings updated successfully');
    },

    // Handle rollback if mutation fails
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
};
