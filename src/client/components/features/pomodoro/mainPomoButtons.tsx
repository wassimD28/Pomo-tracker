import { usePomoStore } from "@/src/client/store/usePomoStore";
import { cn } from "@/src/shared/utils/utils";
import { Pause, Play } from "lucide-react";
import EndSessionDialog from "./endSessionDialog";

function MainPomoButtons() {
  const { pomoSession, startPomoSession, pausePomoSession, resumePomoSession } =
    usePomoStore();
  return (
    <div
      className={cn(
        "absolute bottom-28 max-sm:bottom-44 flex w-0 items-center justify-center rounded-full bg-gradient-to-b from-custom-tomato-400 to-custom-tomato-600 px-14 py-10 font-bold uppercase text-custom-white-500 opacity-100 shadow-xl shadow-black/20 duration-500 ease-custom-ease text-shadow-glow-sm",
        pomoSession.isStarted && "bottom-24 w-44 max-sm:bottom-24",
        pomoSession.isPaused && "from-custom-maroon-400 to-custom-maroon-600",
        pomoSession.isBreak && "from-green-500 to-green-800",
        pomoSession.isCompleted &&
          "bottom-96 from-green-500 to-green-800 opacity-0",
        (pomoSession.isFocusComplete || pomoSession.isBreakComplete) &&
          "opacity-0",
      )}
    >
      <Play
        onClick={() => startPomoSession()}
        strokeLinecap="round"
        className={cn(
          "pointer-events-auto absolute scale-[2] cursor-pointer fill-custom-white-200 stroke-custom-white-200 opacity-100 hover:fill-custom-white-600 hover:stroke-custom-white-600",
          pomoSession.isStarted && "pointer-events-none opacity-0",
        )}
      />
      {/* resume pomo button  */}
      <Play
        onClick={() => resumePomoSession()}
        strokeLinecap="round"
        className={cn(
          "pointer-events-none absolute scale-[2] cursor-pointer fill-custom-white-200 stroke-custom-white-200 opacity-0 hover:fill-custom-white-600 hover:stroke-custom-white-600",
          pomoSession.isStarted &&
            pomoSession.isPaused &&
            "pointer-events-auto left-10 opacity-100",
        )}
      />
      <Pause
        onClick={() => pausePomoSession()}
        strokeLinecap="round"
        className={cn(
          "pointer-events-none absolute scale-[2] cursor-pointer fill-custom-white-200 stroke-custom-white-200 opacity-0 hover:fill-custom-white-600 hover:stroke-custom-white-600",
          pomoSession.isStarted &&
            !pomoSession.isPaused &&
            "pointer-events-auto left-10 opacity-100",
        )}
      />
      <EndSessionDialog />
    </div>
  );
}

export default MainPomoButtons;
