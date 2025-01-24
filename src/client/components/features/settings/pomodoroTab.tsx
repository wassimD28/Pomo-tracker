import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

function PomodoroSettingTab() {
  return (
    <div className="flex flex-col gap-4 p-2">
      <div className="grid grid-cols-[auto_100px] items-center justify-start gap-x-6 gap-y-4">
        {/* Session duration  */}
        <Label className="text-xs font-normal">Session duration</Label>
        <span className="relative flex items-center">
          <Input
            value={25}
            maxLength={1}
            type="number"
            className="[&]:[-moz-appearance]:textfield h-8 bg-white/10 text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
          />
          <span className="absolute right-2 text-xs text-white/60">
            minutes
          </span>
        </span>
        {/* Break duration  */}
        <Label className="text-xs font-normal">Break duration</Label>
        <span className="relative flex items-center">
          <Input
            value={25}
            maxLength={1}
            type="number"
            className="[&]:[-moz-appearance]:textfield h-8 bg-white/10 text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
          />
          <span className="absolute right-2 text-xs text-white/60">
            minutes
          </span>
        </span>
        {/* long break  */}
        <Label className="text-xs font-normal">Long break duration</Label>
        <span className="relative flex items-center">
          <Input
            value={25}
            maxLength={1}
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
