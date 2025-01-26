"use client";

import { usePomoStore } from "@/src/client/store/usePomoStore";
import PomodoroProgress from "@/src/client/components/features/pomodoro/pomoProgressBar";
import { Pause, Play, Square } from "lucide-react";
import { cn } from "@/src/shared/utils/utils";

export default function PomodoroPage() {
  const {
    pomoSession,
    startPomoSession,
    endPomoSession,
    pausePomoSession,
    resumePomoSession,
  } = usePomoStore();
  return (
    <div className="pointer-events-auto relative flex h-svh w-full flex-col items-center justify-center overflow-hidden bg-custom-black-500 pl-10 text-custom-white-300">
      {/* blured circle  */}
      <div
        className={cn(
          "absolute -bottom-20 aspect-square w-[500px] rounded-full bg-custom-tomato-500 opacity-60 blur-[100px] duration-1000 ease-custom-ease",
          pomoSession.isStarted && "bottom-28",
        )}
      />
      <h1
        className={cn(
          "absolute top-10 bg-gradient-to-b from-custom-white-100 to-custom-white-500 bg-clip-text pb-1 text-6xl font-bold capitalize text-transparent opacity-100 duration-1000 ease-custom-ease text-shadow-glow-sm",
          pomoSession.isStarted && "-top-20 opacity-0",
        )}
      >
        ready to focus?
      </h1>
      <p
        className={cn(
          "absolute top-28 font-light capitalize opacity-40 duration-1000 ease-custom-ease",
          pomoSession.isStarted && "-top-0 opacity-0",
        )}
      >
        {`focus ${~~(pomoSession.focusDuration / 60)} min and rest ${~~(pomoSession.breakDuration / 60)} min`}
      </p>
      <div
        className={cn(
          "absolute -bottom-16 flex aspect-square w-[500px] scale-100 flex-col items-center justify-center overflow-hidden rounded-full duration-1000 ease-custom-ease",
          pomoSession.isStarted && "bottom-32 scale-75",
        )}
      >
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-custom-tomato-400 to-custom-tomato-600" />

        {/* Overlay gradient that fades in/out */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-b from-custom-maroon-400 to-custom-maroon-500 opacity-0 transition-opacity duration-1000 ease-out",
            pomoSession.isPaused && "opacity-100",
          )}
        />
        <PomodoroProgress />
        {/* play/pause/stop button */}
        <div
          className={cn(
            "absolute bottom-28 flex w-0 items-center justify-center rounded-full bg-gradient-to-b from-custom-tomato-400 to-custom-tomato-600 px-14 py-10 font-bold uppercase text-custom-white-500 shadow-xl shadow-black/20 duration-1000 ease-custom-ease text-shadow-glow-sm",
            pomoSession.isStarted && "bottom-24 w-44",
            pomoSession.isPaused &&
              "from-custom-maroon-400 to-custom-maroon-600",
          )}
        >
          <Play
            onClick={() =>
              startPomoSession(
                pomoSession.focusDuration,
                pomoSession.breakDuration,
              )
            }
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
          <Square
            onClick={() => endPomoSession()}
            strokeLinecap="round"
            className={cn(
              "pointer-events-none absolute scale-[2] cursor-pointer fill-custom-white-200 stroke-custom-white-200 opacity-0 hover:fill-custom-white-600 hover:stroke-custom-white-600",
              pomoSession.isStarted &&
                "pointer-events-auto right-10 opacity-100",
            )}
          />
        </div>
      </div>
      <p
        className={cn(
          "absolute -bottom-0 font-light capitalize opacity-0 duration-1000 ease-custom-ease",
          pomoSession.isStarted && "bottom-32 opacity-40",
        )}
      >
        {`you will rest for ${~~(pomoSession.breakDuration / 60)} min later`}
      </p>
    </div>
  );
}
