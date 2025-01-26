"use client"
import React, { createContext, ReactNode } from "react";
import { useSettingQuery } from "@/src/client/api/queries/useSettingQuery";
import { Setting } from "@/src/shared/types/interfaces/common.interface";

// Define the shape of our context
interface SettingsContextType {
  settings?: Setting;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

// Create the context with a default value
export const SettingsContext = createContext<SettingsContextType>({
  settings: undefined,
  isLoading: true,
  isError: false,
  error: null,
});

// Create a provider component
export const SettingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Use the settings query hook
  const { data, isLoading, isError, error } = useSettingQuery();

  // Prepare the context value
  const contextValue = {
    settings: data?.data,
    isLoading,
    isError,
    error: error instanceof Error ? error : null,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};
