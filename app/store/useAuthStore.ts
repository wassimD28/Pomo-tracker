import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photo?: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null }),
      }),
      {
        name: "auth-storage",
      },
    ),
  ),
);
