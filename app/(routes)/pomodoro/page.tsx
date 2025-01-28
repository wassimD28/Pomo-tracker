"use client";

import { usePomoStore } from "@/src/client/store/usePomoStore";
import PomodoroProgress from "@/src/client/components/features/pomodoro/pomoProgressBar";
import { ChevronLast, Pause, Play } from "lucide-react";
import { cn } from "@/src/shared/utils/utils";
import { Button } from "@/src/client/components/ui/button";
import EndSessionDialog from "@/src/client/components/features/pomodoro/endSessionDialog";

export default function PomodoroPage() {
  const {
    pomoSession,
    startFocus,
    updateCurrentCycle,
    skipBreakDuration,
    endFocusSession,
    startBreakSession,
    startPomoSession,
    endPomoSession,
    pausePomoSession,
    resumePomoSession,
  } = usePomoStore();

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
    <div className="pointer-events-auto relative flex h-svh w-full flex-col items-center justify-center overflow-hidden bg-custom-black-500 pl-10 text-custom-white-300">
      {/* blured circle  */}
      <div
        className={cn(
          "absolute -bottom-20 aspect-square w-[500px] rounded-full bg-custom-tomato-500 opacity-60 blur-[100px] duration-1000 ease-custom-ease",
          (pomoSession.isStarted || pomoSession.isPaused) && "bottom-28",
          ((pomoSession.isBreak || pomoSession.isFocus) && pomoSession.isPaused) && "-bottom-5",
          pomoSession.isBreak && "bg-green-500",
          pomoSession.isFocusComplete && "-bottom-24 bg-green-600",
          pomoSession.isBreakComplete && "-bottom-24 bg-custom-tomato-500",
        )}
      />

      <h1
        className={cn(
          "absolute top-10 bg-gradient-to-b from-custom-white-100 to-custom-white-500 bg-clip-text pb-1 text-6xl font-bold capitalize text-transparent opacity-100 duration-1000 ease-custom-ease text-shadow-glow-sm",
          pomoSession.isStarted && "-top-20 opacity-0",
          (pomoSession.isFocusComplete ||
            pomoSession.isBreakComplete ||
            pomoSession.isPaused) &&
            "top-10 opacity-100",
        )}
      >
        {getHeading()}
      </h1>
      <p
        className={cn(
          "absolute top-28 font-light opacity-40 duration-1000 ease-custom-ease",
          pomoSession.isStarted && "-top-0 opacity-0",
          (pomoSession.isFocusComplete ||
            pomoSession.isBreakComplete ||
            pomoSession.isPaused) &&
            "top-28 opacity-40",
        )}
      >
        {getHeadingDescription()}
      </p>
      {/* break time confirmation buttons  */}
      <div
        className={cn(
          "pointer-events-none absolute -top-0 grid w-80 grid-cols-2 gap-4 opacity-0 transition-all duration-1000 ease-custom-ease",
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
          "pointer-events-none absolute -top-0 grid w-80 grid-cols-2 gap-4 opacity-0 transition-all duration-1000 ease-custom-ease",
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
            endPomoSession();
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
          "pointer-events-none absolute -top-0 grid w-80 grid-cols-2 gap-4 opacity-0 transition-all duration-1000 ease-custom-ease",
          pomoSession.isPaused && pomoSession.isFocus &&
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
          <Play/>Resume
        </Button>
        <Button
          onClick={() => {
            endFocusSession();
          }}
          className={cn(
            "w-full border border-custom-white-500 bg-transparent text-custom-white-500 opacity-100 backdrop-blur-sm transition-all duration-500 ease-custom-ease hover:bg-custom-white-500/20",
          )}
        >
          <ChevronLast/> Skip Focus
        </Button>
      </div>
      {/* pause confirmation buttons on break  */}
      <div
        className={cn(
          "pointer-events-none absolute -top-0 grid w-80 grid-cols-2 gap-4 opacity-0 transition-all duration-1000 ease-custom-ease",
          pomoSession.isPaused && pomoSession.isBreak &&
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
          <Play/>Resume
        </Button>
        <Button
          onClick={() => {
            skipBreakDuration();
          }}
          className={cn(
            "w-full border border-custom-white-500 bg-transparent text-custom-white-500 opacity-100 backdrop-blur-sm transition-all duration-500 ease-custom-ease hover:bg-custom-white-500/20",
          )}
        >
          <ChevronLast/> Skip Break
        </Button>
      </div>

      <div
        className={cn(
          "absolute -bottom-16 flex aspect-square w-[500px] scale-100 flex-col items-center justify-center overflow-hidden rounded-full duration-1000 ease-custom-ease",
          pomoSession.isStarted && "bottom-32 scale-75",
          pomoSession.isPaused  && "-bottom-10 scale-75",
          (pomoSession.isFocusComplete || pomoSession.isBreakComplete) &&
            "scale-80 -bottom-32",
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
            pomoSession.isBreak && "opacity-100",
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
        <div
          className={cn(
            "absolute bottom-28 flex w-0 items-center justify-center rounded-full bg-gradient-to-b from-custom-tomato-400 to-custom-tomato-600 px-14 py-10 font-bold uppercase text-custom-white-500 opacity-100 shadow-xl shadow-black/20 duration-1000 ease-custom-ease text-shadow-glow-sm",
            pomoSession.isStarted && "bottom-24 w-44",
            pomoSession.isPaused &&
              "from-custom-maroon-400 to-custom-maroon-600",
            pomoSession.isBreak && "from-green-500 to-green-800",
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
          <EndSessionDialog/>
        </div>
      </div>
      <p
        className={cn(
          "absolute -bottom-20 font-light capitalize opacity-0 duration-1000 ease-custom-ease",
          pomoSession.isStarted && "bottom-32 opacity-40",
          (pomoSession.isFocusComplete ||
            pomoSession.isBreakComplete ||
            pomoSession.isPaused) &&
            "-bottom-20 opacity-0",
        )}
      >
        {pomoSession.isFocus
          ? `you will rest for ${~~(pomoSession.breakDuration / 60)} min later`
          : `Take a break and regain your energy`}
      </p>
      {/* Skip Pomo Focus button */}
      <Button
        onClick={() => {
          endFocusSession();
          updateCurrentCycle();
        }}
        className={cn(
          "absolute -bottom-10 right-4 border border-transparent bg-custom-white-500 opacity-0 backdrop-blur-sm transition-all duration-500 ease-custom-ease hover:border-custom-white-500 hover:bg-custom-white-500/20 hover:text-custom-white-500",
          pomoSession.isStarted &&
            !pomoSession.isBreak &&
            "bottom-4 opacity-100",
          pomoSession.isStarted &&
            (pomoSession.isFocusComplete ||
              pomoSession.isBreakComplete ||
              pomoSession.isPaused) &&
            "-bottom-10 opacity-0",
        )}
      >
        <ChevronLast /> Skip This Focus Session
      </Button>
      {/* Skip break button */}
      <Button
        onClick={() => {
          skipBreakDuration();
        }}
        className={cn(
          "absolute -bottom-10 right-4 border border-transparent bg-custom-white-500 opacity-0 backdrop-blur-sm transition-all duration-500 ease-custom-ease hover:border-custom-white-500 hover:bg-custom-white-500/20 hover:text-custom-white-500",
          pomoSession.isStarted &&
            pomoSession.isBreak &&
            "bottom-4 opacity-100",
        )}
      >
        <ChevronLast /> Skip This Break
      </Button>
    </div>
  );
}
