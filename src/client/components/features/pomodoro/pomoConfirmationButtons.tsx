import { usePomoStore } from "@/src/client/store/usePomoStore";
import { cn } from "@/src/shared/utils/utils";
import { Button } from "../../ui/button";
import { ChevronLast, Play } from "lucide-react";

function PomoConfirmationButtons() {
    const {
      pomoSession,
      resetPomoSession,
      startFocus,
      skipBreakDuration,
      endFocusSession,
      startBreakSession,
      endFocus,
      resumePomoSession,
    } = usePomoStore();
    return (
      <>
        {/* break time confirmation buttons  */}
        <div
          className={cn(
            "pointer-events-none absolute -top-0 grid w-80 select-none grid-cols-2 gap-4 opacity-0 transition-all duration-1000 ease-custom-ease",
            pomoSession.isFocusComplete &&
              "pointer-events-auto top-40 opacity-100",
          )}
        >
          {/* take button */}
          <Button
            onClick={() => {
              startBreakSession();
            }}
            className={cn(
              "w-full border border-transparent bg-custom-white-500/80 opacity-100 backdrop-blur-sm transition-all duration-500 ease-custom-ease hover:border-custom-white-500 hover:bg-custom-white-500 hover:text-custom-black-500",
            )}
          >
            Take a Break
          </Button>
          {/* Skip break button */}
          <Button
            onClick={() => {
              skipBreakDuration();
            }}
            className={cn(
              "w-full border border-custom-white-500 bg-transparent text-custom-white-500 opacity-100 backdrop-blur-sm transition-all duration-500 ease-custom-ease hover:bg-custom-white-500/20",
            )}
          >
            <ChevronLast /> Skip This Break
          </Button>
        </div>
        {/* back to focus confirmation buttons  */}
        <div
          className={cn(
            "pointer-events-none absolute -top-0 grid w-80 select-none grid-cols-2 gap-4 opacity-0 transition-all duration-1000 ease-custom-ease",
            pomoSession.isBreakComplete &&
              "pointer-events-auto top-40 opacity-100",
          )}
        >
          <Button
            onClick={() => {
              startFocus();
            }}
            className={cn(
              "w-full border border-transparent bg-custom-white-500/80 opacity-100 backdrop-blur-sm transition-all duration-500 ease-custom-ease hover:border-custom-white-500 hover:bg-custom-white-500 hover:text-custom-black-500",
            )}
          >
            Back To Focus
          </Button>
          <Button
            onClick={() => {
              endFocusSession();
              resetPomoSession();
            }}
            className={cn(
              "w-full border border-custom-white-500 bg-transparent text-custom-white-500 opacity-100 backdrop-blur-sm transition-all duration-500 ease-custom-ease hover:bg-custom-white-500/20",
            )}
          >
            End Session
          </Button>
        </div>
        {/* pause confirmation buttons  */}
        <div
          className={cn(
            "pointer-events-none absolute -top-0 grid w-80 select-none grid-cols-2 gap-4 opacity-0 transition-all duration-1000 ease-custom-ease",
            pomoSession.isPaused &&
              pomoSession.isFocus &&
              "pointer-events-auto top-40 opacity-100",
          )}
        >
          <Button
            onClick={() => {
              resumePomoSession();
            }}
            className={cn(
              "w-full border border-transparent bg-custom-white-500/80 opacity-100 backdrop-blur-sm transition-all duration-500 ease-custom-ease hover:border-custom-white-500 hover:bg-custom-white-500 hover:text-custom-black-500",
            )}
          >
            <Play />
            Resume
          </Button>
          <Button
            onClick={() => {
              endFocus();
            }}
            className={cn(
              "w-full border border-custom-white-500 bg-transparent text-custom-white-500 opacity-100 backdrop-blur-sm transition-all duration-500 ease-custom-ease hover:bg-custom-white-500/20",
            )}
          >
            <ChevronLast /> Skip Focus
          </Button>
        </div>
        {/* pause confirmation buttons on break  */}
        <div
          className={cn(
            "pointer-events-none absolute -top-0 grid w-80 select-none grid-cols-2 gap-4 opacity-0 transition-all duration-1000 ease-custom-ease",
            pomoSession.isPaused &&
              pomoSession.isBreak &&
              "pointer-events-auto top-40 opacity-100",
          )}
        >
          <Button
            onClick={() => {
              resumePomoSession();
            }}
            className={cn(
              "w-full border border-transparent bg-custom-white-500/80 opacity-100 backdrop-blur-sm transition-all duration-500 ease-custom-ease hover:border-custom-white-500 hover:bg-custom-white-500 hover:text-custom-black-500",
            )}
          >
            <Play />
            Resume
          </Button>
          <Button
            onClick={() => {
              skipBreakDuration();
            }}
            className={cn(
              "w-full border border-custom-white-500 bg-transparent text-custom-white-500 opacity-100 backdrop-blur-sm transition-all duration-500 ease-custom-ease hover:bg-custom-white-500/20",
            )}
          >
            <ChevronLast /> Skip Break
          </Button>
        </div>
      </>
    );
    
}

export default PomoConfirmationButtons;