import { usePomoStore } from "@/src/client/store/usePomoStore";
import { cn } from "@/src/shared/utils/utils";

function PomoPageFooter() {
  const { pomoSession } = usePomoStore();
  return (
    <p
      className={cn(
        "absolute -bottom-20 2xl:scale-150 select-none font-light capitalize opacity-0 duration-1000 ease-custom-ease",
        pomoSession.isStarted && "bottom-32 opacity-40",
        (pomoSession.isFocusComplete ||
          pomoSession.isBreakComplete ||
          pomoSession.isPaused) &&
          "-bottom-20 select-none opacity-0",
      )}
    >
      {pomoSession.isFocus
        ? `you will rest for ${~~(pomoSession.breakDuration / 60)} min later`
        : `Take a break and regain your energy`}
    </p>
  );
}

export default PomoPageFooter;
