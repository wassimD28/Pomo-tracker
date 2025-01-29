"use client"
import React, { createContext, ReactNode, useEffect } from "react";
import { useSettingQuery } from "@/src/client/api/queries/useSettingQuery";
import { Setting } from "@/src/shared/types/interfaces/common.interface";
import { usePomoStore } from "../store/usePomoStore";
import { PomoSessionData } from "@/src/shared/types/interfaces/pomodoro.interface";

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

  const { setPomoSessionData, resetPomoSession } = usePomoStore()
  useEffect(() => {
    if (data?.data) {
      const settings = data.data;

      const pomoSessionData: PomoSessionData = {
        cyclesNumber: settings.defaultCyclesNumber,
        focusDuration : settings.defaultFocusDuration,
        breakDuration: settings.defaultBreakDuration,
        longBreakDuration: settings.defaultLongBreakDuration,
      };

      // Update Pomo store with default settings
      setPomoSessionData(pomoSessionData);
      resetPomoSession()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data])

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
