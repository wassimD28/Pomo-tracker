import { usePomoStore } from "@/src/client/store/usePomoStore";
import { cn } from "@/src/shared/utils/utils";

function PomoPageHeadingDesc() {
  const { pomoSession } = usePomoStore();
  const getHeadingDescription = () => {
    if (pomoSession.isFocusComplete) {
      return `Take a ${~~(pomoSession.breakDuration / 60)} minute break to regain your energy.`;
    } else if (pomoSession.isPaused && pomoSession.isFocus) {
      return `Don't stop now. Complete this focus session and then you can rest for ${~~(pomoSession.breakDuration / 60)} minutes.`;
    } else if (pomoSession.isBreakComplete) {
      return `Break time is over, it's now time for ${~~(pomoSession.focusDuration / 60)} minutes of focus.`;
    } else if (pomoSession.isBreak && pomoSession.isPaused) {
      return `Don't underestimate the time to rest, it is important to focus well later.`;
    }

    return `Focus ${~~(pomoSession.focusDuration / 60)} min and rest ${~~(pomoSession.breakDuration / 60)} min`;
  };
  return (
    <p
      className={cn(
        "absolute top-28 select-none text-center font-light opacity-40 duration-1000 ease-custom-ease max-sm:top-24 max-sm:w-[90%] max-sm:text-sm 2xl:top-44 2xl:scale-150",
       ( pomoSession.isStarted ||
          pomoSession.isCompleted) &&
          "-top-10 opacity-0 2xl:-top-20",
        (pomoSession.isFocusComplete ||
          pomoSession.isBreakComplete ||
          pomoSession.isPaused) &&
          "top-28 opacity-40 2xl:top-44",
      )}
    >
      {getHeadingDescription()}
    </p>
  );
}

export default PomoPageHeadingDesc;
