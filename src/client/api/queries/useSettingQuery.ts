import { API_ENDPOINTS } from "@/src/shared/constant/endpoints";
import { Setting } from "@/src/shared/types/interfaces/common.interface"
import { useQuery } from "@tanstack/react-query"
import axios from "axios";

export const useSettingQuery = () => {
  return useQuery<{ status: string; data: Setting }>({
    queryKey: ["settings"],
    queryFn: async () => {
      const response = await axios.get(API_ENDPOINTS.SETTINGS.BASE);
      return response.data as { status: string; data: Setting };
    },
  });
}