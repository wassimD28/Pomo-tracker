import { usePomoStore } from "@/src/client/store/usePomoStore";
import { cn } from "@/src/shared/utils/utils";
import PomodoroProgress from "./pomoProgressBar";
import MainPomoButtons from "./mainPomoButtons";
import { Check } from "lucide-react";

function MainPomo() {
  const { pomoSession } = usePomoStore();
  return (
    <div
      className={cn(
        "absolute -bottom-10 max-sm:-bottom-24 flex aspect-square w-[500px] scale-100 flex-col items-center justify-center overflow-hidden rounded-full duration-1000 ease-custom-ease",
        pomoSession.isStarted && "max-sm:bottom-32 bottom-44 max-sm:scale-[0.6] scale-[0.8]",
        pomoSession.isCompleted && "bottom-64 max-sm:bottom-64 max-sm:scale-[0.4] scale-50",
        pomoSession.isPaused && "-bottom-10 scale-75 max-sm:-bottom-4",
        (pomoSession.isFocusComplete || pomoSession.isBreakComplete) &&
          "scale-80 -bottom-32 max-sm:-bottom-24 max-sm:scale-[0.85]",
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
      <PomodoroProgress />
      {/* play/pause/stop button */}
      <MainPomoButtons />
      <Check className={cn("scale-[13] ml-10 opacity-0 translate-y-96 ease-custom-ease duration-1000", pomoSession.isCompleted && "translate-y-0 opacity-90")}/>
    </div>
  );
}

export default MainPomo;
