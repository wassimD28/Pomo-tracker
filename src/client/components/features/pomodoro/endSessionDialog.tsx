import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { usePomoStore } from "@/src/client/store/usePomoStore";
import { cn } from "@/src/shared/utils/utils";
import { Square } from "lucide-react";

function EndSessionDialog() {
  const { endPomoSession, pomoSession, resetPomoSession } = usePomoStore();
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={cn(
          "pointer-events-none absolute scale-[2] cursor-pointer opacity-0",
          pomoSession.isFocus && "pointer-events-auto right-10 opacity-100",
        )}
      >
        <Square
          strokeLinecap="round"
          className="fill-custom-white-200 stroke-custom-white-200 hover:fill-custom-white-600 hover:stroke-custom-white-600"
        />
      </AlertDialogTrigger>
      <AlertDialogContent className="border-white/60 bg-white/10 backdrop-blur-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Will you stop during the session?
          </AlertDialogTitle>
          <AlertDialogDescription>
            You can stop here, but choose whether you want to save this session
            even if it’s incomplete.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-white/10 text-white/90">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-custom-orange-500 text-custom-black-700 hover:bg-custom-orange-400"
            onClick={() => {
              endPomoSession();
              resetPomoSession();
            }}
          >
            End Session
          </AlertDialogAction>
          <AlertDialogAction
            className="bg-custom-white-500 text-custom-black-700 hover:bg-custom-white-400"
            onClick={() => {
              endPomoSession();
              resetPomoSession();
            }}
          >
            End & Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default EndSessionDialog;
