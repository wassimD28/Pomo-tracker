import React, { useEffect } from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import "@/src/client/styles/removeInputBorder.css";
import { ToMinutes } from "@/src/shared/utils/utils";
import { Setting } from "@/src/shared/types/interfaces/common.interface";
import { useSettings } from "@/src/client/hooks/useSettings";

interface PomodoroTabProps{
  settings: Setting
  setSettings : (value: Setting) => void
}

function PomodoroSettingTab({ settings, setSettings}: PomodoroTabProps) {
  // Use query to fetch existing settings
  const { settings: settingsData, isLoading, isError } = useSettings();

  // Populate settings from fetched data
  useEffect(() => {
    if (settingsData) {
      const fetchedSettings = settingsData;
      setSettings({
        darkmode: false, // Placeholder, update with actual darkmode logic
        defaultCyclesNumber: fetchedSettings.defaultCyclesNumber,
        defaultFocusDuration: ToMinutes(fetchedSettings.defaultFocusDuration),
        defaultBreakDuration: ToMinutes(fetchedSettings.defaultBreakDuration),
        defaultLongBreakDuration: ToMinutes(
          fetchedSettings.defaultLongBreakDuration,
        ),
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsData]);

  

  // Generic handler for number input changes
  const handleNumberChange =
    (field: keyof typeof settings) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      // Only allow numbers and limit to 2 digits
      const sanitizedValue = value.replace(/[^0-9]/g, "").slice(0, 2);

      // Convert to number, default to 1 if empty
      const numValue = sanitizedValue === "" ? 1 : parseInt(sanitizedValue, 10);

      // Set bounds for different fields
      let boundedValue = numValue;
      switch (field) {
        case "defaultCyclesNumber":
          boundedValue = Math.max(1, Math.min(numValue, 10)); // 1-10 cycles
          break;
        case "defaultFocusDuration":
          boundedValue = Math.max(5, Math.min(numValue, 60)); // 5-60 minutes
          break;
        case "defaultBreakDuration":
          boundedValue = Math.max(1, Math.min(numValue, 30)); // 1-30 minutes
          break;
        case "defaultLongBreakDuration":
          boundedValue = Math.max(5, Math.min(numValue, 45)); // 5-45 minutes
          break;
      }

      setSettings({
        ...settings,
        [field]: boundedValue,
      });
    };
  // Render error message if there was an error
  if (isError) {
    return (
      <div className="text-red-500 text-sm">
        Failed to fetch settings. Please try again later.
      </div>
    );
  }

  // Render input with error handling for loading state
  if (isLoading) {
    return <div>Loading settings...</div>;
  }

  return (
    <div className="flex flex-col gap-4 xl:p-2">
      <h1 className="text-lg font-medium capitalize text-white/90">
        Default session values
      </h1>
      <div className="grid grid-cols-[auto_100px] items-center justify-between gap-y-2">
        {/* Cycles numbers  */}
        <Label className="text-xs font-normal text-white/60">
          Number of cycles
        </Label>
        <span className="relative flex items-center">
          <Input
            value={settings.defaultCyclesNumber}
            onChange={handleNumberChange("defaultCyclesNumber")}
            maxLength={2}
            type="number"
            className="[&]:[-moz-appearance]:textfield h-8 bg-white/10 text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
          />
          <span className="absolute right-2 text-xs text-white/60">
            {settings.defaultCyclesNumber == 1 ? "cycle" : "cycles"}
          </span>
        </span>

        {/* Focus duration  */}
        <Label className="text-xs font-normal text-white/60">
          Focus duration
        </Label>
        <span className="relative flex items-center">
          <Input
            value={settings.defaultFocusDuration}
            onChange={handleNumberChange("defaultFocusDuration")}
            maxLength={2}
            type="number"
            className="[&]:[-moz-appearance]:textfield h-8 bg-white/10 text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
          />
          <span className="absolute right-2 text-xs text-white/60">
            minutes
          </span>
        </span>

        {/* Break duration  */}
        <Label className="text-xs font-normal text-white/60">
          Break duration
        </Label>
        <span className="relative flex items-center">
          <Input
            value={settings.defaultBreakDuration}
            onChange={handleNumberChange("defaultBreakDuration")}
            maxLength={2}
            type="number"
            className="[&]:[-moz-appearance]:textfield h-8 bg-white/10 text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
          />
          <span className="absolute right-2 text-xs text-white/60">
            minutes
          </span>
        </span>

        {/* Long break duration  */}
        <Label className="text-xs font-normal text-white/60">
          Long break duration
        </Label>
        <span className="relative flex items-center">
          <Input
            value={settings.defaultLongBreakDuration}
            onChange={handleNumberChange("defaultLongBreakDuration")}
            maxLength={2}
            type="number"
            className="[&]:[-moz-appearance]:textfield h-8 bg-white/10 text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
          />
          <span className="absolute right-2 text-xs text-white/60">
            minutes
          </span>
        </span>
      </div>
    </div>
  );
}

export default PomodoroSettingTab;
