import { usePomoStore } from "@/src/client/store/usePomoStore";
import { cn } from "@/src/shared/utils/utils";

function BluredCercle() {
    const { pomoSession } = usePomoStore();
    return (
      <div
        className={cn(
          "absolute -bottom-20 aspect-square w-[400px] rounded-full bg-custom-tomato-500 opacity-60 blur-[100px] duration-1000 ease-custom-ease max-sm:-bottom-4 xl:w-[500px] 2xl:scale-150",
          pomoSession.isStarted &&
            "bottom-28 max-sm:bottom-40 max-sm:scale-90 2xl:bottom-80",
          (pomoSession.isBreak || pomoSession.isFocus) &&
            pomoSession.isPaused &&
            "-bottom-5 max-sm:bottom-5 max-sm:scale-[0.8] 2xl:bottom-36",
          pomoSession.isBreak && "bg-green-500",
          pomoSession.isFocusComplete &&
            "-bottom-24 bg-green-600 max-sm:bottom-5 2xl:bottom-10",
          pomoSession.isCompleted &&
            "max-sm: bottom-72 scale-75 bg-green-400 max-sm:bottom-80",
          pomoSession.isBreakComplete &&
            "-bottom-24 bg-custom-tomato-500 max-sm:bottom-5 2xl:bottom-10",
        )}
      />
    );
}

export default BluredCercle;