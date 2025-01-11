import { create } from "zustand";

interface CategoryStore {
  id: number | null;
  name: string | null;
}

export const useCategoryStore = create<CategoryStore>((set)=>({
  id: null,
  name: null,
  setCategory: (id:number, name:string) => set({id, name}),
  clearCategory: () => set({ id: null, name: null }),
}))