import { create } from "zustand";

interface TaskStore {
  activeTaskId: number | null;
  setActiveTask: (id: number) => void;
  clearActiveTask: () => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  activeTaskId: null,
  setActiveTask: (id) => set({ activeTaskId: id }),
  clearActiveTask: () => set({ activeTaskId: null }),
}));
