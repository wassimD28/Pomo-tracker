import { create } from "zustand";

interface SettingsStore {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  settingsDialogOpen: boolean; 
  setSettingDialogOpen: (isOpen: boolean) => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  darkMode: false,
  setDarkMode: (mode) => set({ darkMode: mode }),
  settingsDialogOpen: false, 
  setSettingDialogOpen: (isOpen) => set({ settingsDialogOpen: isOpen }),
}));
