import { create } from "zustand";
import { TaskSearchBarStore } from "@/src/shared/types/interfaces/store.interface";

// This store is used to manage the state of the task search bar
export const useTaskSearchBarStore = create<TaskSearchBarStore>((set) => ({
  isSearching: false,
  searchTerm: "",
  searchResults: [],
  setSearchTerm: (searchTerm: string) => set({ searchTerm }),
  setIsSearching: (isSearching) => set({ isSearching }),
  handleTaskSelect: (taskId: number) => {
    console.log(taskId);
    set({ isSearching: false, searchTerm: "" });
  },
}));
