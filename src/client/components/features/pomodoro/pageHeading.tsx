import { usePomoStore } from "@/src/client/store/usePomoStore";
import { cn } from "@/src/shared/utils/utils";

function PomoPageHeading() {
  const { pomoSession } = usePomoStore();
  const getHeading = () => {
    if (pomoSession.isFocusComplete) {
      return "it’s break time !";
    } else if (pomoSession.isPaused && pomoSession.isFocus) {
      return "why you stopped ?";
    } else if (pomoSession.isBreakComplete) {
      return "ready for next pomo ?";
    } else if (pomoSession.isBreak && pomoSession.isPaused) {
      return "You need to rest !";
    }

    return "ready to focus?";
  };
  return (
    <h1
      className={cn(
        "absolute top-10 bg-gradient-to-b from-custom-white-100 to-custom-white-500 bg-clip-text pb-1 text-4xl font-bold capitalize text-transparent opacity-100 duration-1000 ease-custom-ease text-shadow-glow-sm max-sm:top-12 max-sm:text-3xl xl:text-6xl 2xl:top-20 2xl:scale-150",
        (pomoSession.isStarted || pomoSession.isCompleted) &&
          "-top-20 opacity-0 2xl:-top-20",
        (pomoSession.isFocusComplete ||
          pomoSession.isBreakComplete ||
          pomoSession.isPaused) &&
          "top-10 opacity-100 2xl:top-20",
      )}
    >
      {getHeading()}
    </h1>
  );
}

export default PomoPageHeading;
