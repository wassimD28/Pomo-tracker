import { usePomoStore } from "@/src/client/store/usePomoStore";
import { cn } from "@/src/shared/utils/utils";

function BluredCercle() {
    const { pomoSession } = usePomoStore();
    return (
      <div
        className={cn(
          "absolute -bottom-20 max-sm:-bottom-4 aspect-square xl:w-[500px] w-[400px] rounded-full bg-custom-tomato-500 opacity-60 blur-[100px] duration-1000 ease-custom-ease",
          (pomoSession.isStarted || pomoSession.isPaused) && "bottom-28 max-sm:bottom-40 max-sm:scale-90",
          (pomoSession.isBreak || pomoSession.isFocus) &&
            pomoSession.isPaused &&
            "-bottom-5 max-sm:bottom-5 max-sm:scale-[0.8]",
          pomoSession.isBreak && "bg-green-500",
          pomoSession.isFocusComplete && "-bottom-24 max-sm:bottom-5 bg-green-600",
          pomoSession.isCompleted && "bottom-72 max-sm:bottom-80 max-sm: scale-75 bg-green-400",
          pomoSession.isBreakComplete && "-bottom-24 max-sm:bottom-5 bg-custom-tomato-500",
        )}
      />
    );
}

export default BluredCercle;