import { create } from "zustand";
import { Task } from "../types/interfaces/common.interface";

interface TaskStore {
  tasks: Task[];
  activeTask: Task | null;
  addTask: (task: Task) => void;
  deleteTask: (taskId: number) => void;
  toggleTaskCompletion: (taskId: number) => void;
  setActiveTask: (task: Task) => void;
  clearActiveTask: () => void;
  updateTask: (taskId: number, updatedTask: Partial<Task>) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  activeTask: null,
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
  toggleTaskCompletion: (taskId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    })),
  setActiveTask: (task) =>
    set(() => ({
      activeTask: task,
    })),
  clearActiveTask: () =>
    set(() => ({
      activeTask: null,
    })),
  updateTask: (taskId, updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task,
      ),
    })),
}));
