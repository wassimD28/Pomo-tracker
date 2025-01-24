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

function SettingsDialog() {
  const { settingsDialogOpen, setSettingDialogOpen } = useSettingsStore();

  return (
    <Dialog
      open={settingsDialogOpen}
      onOpenChange={setSettingDialogOpen} // This enables closing the dialog
    >
      <DialogContent className="flex h-96 flex-col gap-0 border-none bg-custom-white-100/10 p-2 text-custom-white-100 backdrop-blur-sm">
        <DialogClose
          className="bg-white-20 group absolute right-4 top-4 rounded-sm border-none opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:border-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          onClick={() => setSettingDialogOpen(false)}
        >
          <X className="h-4 w-4" />
        </DialogClose>
        <DialogTitle className="p-2 text-2xl font-semibold text-white/90">Settings</DialogTitle>
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
            <PomodoroSettingTab />
          </TabsContent>
          <TabsContent
            className="m-0 h-full w-full rounded bg-white/10 p-2"
            value="tasks"
          >
            Change your password here.
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsDialog;
