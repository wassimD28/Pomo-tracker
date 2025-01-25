import React, { useState } from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import "@/src/client/styles/removeInputBorder.css";

function PomodoroSettingTab() {
  // State for different Pomodoro settings
  const [settings, setSettings] = useState({
    cycles: 1,
    focusDuration: 25,
    breakDuration: 5,
    longBreakDuration: 15,
  });

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
        case "cycles":
          boundedValue = Math.max(1, Math.min(numValue, 10)); // 1-10 cycles
          break;
        case "focusDuration":
          boundedValue = Math.max(5, Math.min(numValue, 60)); // 5-60 minutes
          break;
        case "breakDuration":
          boundedValue = Math.max(1, Math.min(numValue, 30)); // 1-30 minutes
          break;
        case "longBreakDuration":
          boundedValue = Math.max(5, Math.min(numValue, 45)); // 5-45 minutes
          break;
      }

      setSettings((prev) => ({
        ...prev,
        [field]: boundedValue,
      }));
    };

  return (
    <div className="flex flex-col gap-4 p-2">
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
            value={settings.cycles}
            onChange={handleNumberChange("cycles")}
            maxLength={2}
            type="number"
            className="[&]:[-moz-appearance]:textfield h-8 bg-white/10 text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
          />
          <span className="absolute right-2 text-xs text-white/60">{settings.cycles == 1 ? "cycle" : "cycles"}</span>
        </span>

        {/* Focus duration  */}
        <Label className="text-xs font-normal text-white/60">
          Focus duration
        </Label>
        <span className="relative flex items-center">
          <Input
            value={settings.focusDuration}
            onChange={handleNumberChange("focusDuration")}
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
            value={settings.breakDuration}
            onChange={handleNumberChange("breakDuration")}
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
            value={settings.longBreakDuration}
            onChange={handleNumberChange("longBreakDuration")}
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
