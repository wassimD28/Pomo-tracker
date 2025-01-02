"use client";

import { formatTime } from "@/lib/utils";
import { usePomoStore } from "../store/usePomoStore";

export default function PomodoroPage() {
  const { pomoSession } = usePomoStore();
  return (
    <div className="relative flex h-svh w-full flex-col items-center justify-center overflow-hidden bg-custom-black-500 pl-10 text-custom-white-300">
      {/* blured circle  */}
      <div className="absolute -bottom-20 aspect-square w-[500px] rounded-full bg-custom-tomato-500 opacity-60 blur-[100px]" />
      <h1 className="absolute pb-1 top-10 bg-gradient-to-b from-custom-white-100 to-custom-white-500 bg-clip-text text-6xl font-bold capitalize text-transparent text-shadow-glow-sm">
        ready to focus?
      </h1>
      <p className="absolute top-28 font-light capitalize opacity-40">
        focus 25 min and rest 5 min
      </p>
      {/* main pomodoro shape */}
      <div className="absolute -bottom-16 flex aspect-square w-[500px] flex-col items-center justify-center rounded-full bg-gradient-to-b from-custom-tomato-400 to-custom-tomato-600">
        {/* <h1 className="select-none bg-gradient-to-b from-custom-white-200 to-custom-white-600 bg-clip-text text-9xl font-bold text-transparent">
          {formatTime(pomoSession.duration)}
        </h1> */}
      </div>
    </div>
  );
}
