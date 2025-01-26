import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose, // Import DialogClose
} from "@/src/client/components/ui/dialog";
import { X } from "lucide-react"; // Import X icon from Lucide React
import { useSettingsStore } from "@/src/client/store/useSettingsStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PomodoroSettingTab from "../../features/settings/pomodoroTab";
import { Button } from "../../ui/button";
import { Setting } from "@/src/shared/types/interfaces/common.interface";
import { useState } from "react";
import { useUpdateSettings } from "@/src/client/api/mutations/setting/useUpdateSettings";
import { ToSeconds } from "@/src/shared/utils/utils";

function SettingsDialog() {
  const { settingsDialogOpen, setSettingDialogOpen } = useSettingsStore();
  // State for different Pomodoro settings
  const [settings, setSettings] = useState<Setting>({
    darkmode: false,
    defaultCyclesNumber: 1,
    defaultFocusDuration: 25,
    defaultBreakDuration: 5,
    defaultLongBreakDuration: 15,
  });
  // Use mutation for updating settings
  const updateSettingsMutation = useUpdateSettings();
  // Handle saving settings
  const handleSaveSettings = () => {
    // Convert minutes back to seconds for API
    console.log("Updating settings:", JSON.stringify({
      darkmode: false, // Placeholder, update with actual darkmode logic
      defaultCyclesNumber: settings.defaultCyclesNumber,
      defaultFocusDuration: ToSeconds(settings.defaultFocusDuration),
      defaultBreakDuration: ToSeconds(settings.defaultBreakDuration),
      defaultLongBreakDuration: ToSeconds(settings.defaultLongBreakDuration),
    }));
    updateSettingsMutation.mutate({
      darkmode: false, // Placeholder, update with actual darkmode logic
      defaultCyclesNumber: settings.defaultCyclesNumber,
      defaultFocusDuration: ToSeconds(settings.defaultFocusDuration),
      defaultBreakDuration: ToSeconds(settings.defaultBreakDuration),
      defaultLongBreakDuration: ToSeconds(settings.defaultLongBreakDuration),
    });
  };

  const handleDialogClose = () => {
    setSettingDialogOpen(false);
  };
  return (
    <Dialog
      open={settingsDialogOpen}
      onOpenChange={(open) => {
        // Explicitly handle both open and close states
        setSettingDialogOpen(open);
      }}
    >
      <DialogContent className="z-50 flex h-96 flex-col gap-0 border-none bg-custom-white-100/10 p-2 text-custom-white-100 backdrop-blur-md">
        <DialogClose
          className="bg-white-20 group absolute right-4 top-4 rounded-sm border-none opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:border-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          // Ensure this explicitly closes the dialog
          onClick={handleDialogClose}
        >
          <X className="h-4 w-4" />
        </DialogClose>
        <DialogTitle className="p-2 text-2xl font-semibold text-white/90">
          Settings
        </DialogTitle>
        <Tabs defaultValue="pomodoro" className="flex h-full w-[500px]">
          <TabsList className="mt-4 flex h-full w-36 flex-col items-start justify-start bg-transparent p-0 text-start">
            <TabsTrigger
              className="w-full justify-start rounded rounded-r-none data-[state=active]:bg-white/10 data-[state=active]:text-white/90"
              value="pomodoro"
            >
              Pomodoro
            </TabsTrigger>
            <TabsTrigger
              className="w-full justify-start rounded rounded-r-none data-[state=active]:bg-white/10 data-[state=active]:text-white/90"
              value="tasks"
            >
              Tasks
            </TabsTrigger>
          </TabsList>
          {/* pomodoro tab contentent  */}
          <TabsContent
            value="pomodoro"
            className="m-0 h-full w-full rounded bg-white/10 p-2"
          >
            <PomodoroSettingTab settings={settings} setSettings={setSettings} />
            {
              // Show error message if the update mutation fails
              updateSettingsMutation.isError && (
                <h1 className="rounded border border-red-400 p-2 text-red-400">
                  Faild to update settings
                </h1>
              )
            }
          </TabsContent>
          <TabsContent
            className="m-0 h-full w-full rounded bg-white/10 p-2"
            value="tasks"
          >
            Still under development.
          </TabsContent>
        </Tabs>
        {/* save button  */}
        <Button
          onClick={handleSaveSettings}
          disabled={updateSettingsMutation.isPending}
          className="relative left-3/4 mt-2 w-32 bg-custom-white-300 font-semibold hover:bg-custom-white-300/80"
        >
          {updateSettingsMutation.isPending ? "Saving..." : "Save"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsDialog;
