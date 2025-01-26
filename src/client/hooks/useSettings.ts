
import { useContext } from "react";
import { SettingsContext } from "../providers/settingsProvider";

export const useSettings = () => {
  const context = useContext(SettingsContext);

  // Provide a helpful error if used outside of provider
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }

  return context;
};
