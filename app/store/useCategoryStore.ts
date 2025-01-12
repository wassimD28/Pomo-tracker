import { create } from "zustand";

interface Category {
  id: number | null;
  name: string | null;
}

interface CategoryStore {
  category: Category;
  setCategory: (id: number, name: string | null) => void;
  clearCategory: () => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  category: { id: null, name: null },
  setCategory: (id, name) =>
    set(() => ({
      category: { id, name },
    })),
  clearCategory: () =>
    set(() => ({
      category: { id: null, name: null },
    })),
}));
