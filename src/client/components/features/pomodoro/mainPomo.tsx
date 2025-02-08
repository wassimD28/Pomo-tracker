import { usePomoStore } from "@/src/client/store/usePomoStore";
import { cn } from "@/src/shared/utils/utils";
import PomodoroProgress from "./pomoProgressBar";
import MainPomoButtons from "./mainPomoButtons";
import { Check } from "lucide-react";
import TaskSearchBar from "./taskSearchBar";

function MainPomo() {
  
  const { pomoSession } = usePomoStore();
  return (
    <div
      className={cn(
        "absolute -bottom-10 flex aspect-square w-[500px] scale-100 flex-col items-center justify-center overflow-hidden rounded-full duration-1000 ease-custom-ease max-sm:-bottom-24 2xl:-bottom-0 2xl:scale-[1.7]",
        pomoSession.isStarted &&
          "bottom-32 scale-[0.7] max-sm:bottom-32 max-sm:scale-[0.6] 2xl:bottom-80 2xl:scale-[1.3]",
        pomoSession.isCompleted &&
          "bottom-64 scale-50 max-sm:bottom-64 max-sm:scale-[0.4] 2xl:bottom-[50%] 2xl:scale-100",
        pomoSession.isPaused &&
          "-bottom-10 scale-75 max-sm:-bottom-4 2xl:bottom-40",
        (pomoSession.isFocusComplete || pomoSession.isBreakComplete) &&
          "scale-80 -bottom-32 max-sm:-bottom-24 max-sm:scale-[0.85] 2xl:-bottom-1 2xl:scale-[1.7]",
      )}
    >
      {/* Base gradient */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-b from-custom-tomato-400 to-custom-tomato-600",
        )}
      />

      {/* Overlay gradient that fades in/out in PAUSE */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-b from-custom-maroon-400 to-custom-maroon-500 opacity-0 transition-opacity duration-1000 ease-out",
          pomoSession.isPaused && "opacity-100",
        )}
      />
      {/* Overlay gradient that fades in/out in BREAK */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-b from-green-500 to-green-900 opacity-0 transition-opacity duration-1000 ease-out",
          (pomoSession.isBreak || pomoSession.isCompleted) && "opacity-100",
        )}
      />
      {/* Overlay gradient that fades in/out in FOCUS COMPLETE */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-b from-green-600 to-green-950 opacity-0 transition-opacity duration-1000 ease-out",
          pomoSession.isFocusComplete && "opacity-100",
        )}
      />
      <TaskSearchBar />
      <PomodoroProgress />
      {/* play/pause/stop button */}
      <MainPomoButtons />
      <Check
        className={cn(
          "ml-10 translate-y-96 scale-[13] opacity-0 duration-1000 ease-custom-ease",
          pomoSession.isCompleted && "translate-y-0 opacity-90",
        )}
      />
    </div>
  );
}

export default MainPomo;
