"use client";
import { usePomoStore } from "@/src/client/store/usePomoStore";
import Image from "next/image";
import { useEffect } from "react";
export const PomodoroSamary = () => {
  const { pomoSession } = usePomoStore();
  useEffect(() => {
    toatalFocusDuration = ~~(pomoSession.totalSessionDuration / 60);
  }, [pomoSession.totalSessionDuration]);
  let toatalFocusDuration = 0;
  return (
    <div
      id="pomodoro_history"
      className="relative flex items-center justify-center overflow-hidden rounded-xl bg-custom-maroon-700 max-sm:"
    >
      {/* blured circle  */}
      <div className="absolute left-14 aspect-square w-56 rounded-full bg-custom-tomato-400 blur-[100px] max-sm:col-span-1 max-sm:-top-[20%] max-sm:-left-[20%]"></div>
      <Image
        className="absolute left-20 z-20 max-sm:left-[65%] max-sm:-bottom-[5%] max-sm:blur-sm"
        src="/tomato-icon.svg"
        alt="tomato icon"
        width={180}
        height={38}
        priority
      />
      {/* text  */}
      <div className="absolute right-10 top-10 flex flex-col max-sm:left-4 max-sm:top-3">
        <h1 className="text-6xl font-bold capitalize text-custom-white-500 max-sm:w-96">
          good job!
        </h1>
        <p className="pl-2 text-sm capitalize text-custom-white-500/50">
          {`You have focused for ${toatalFocusDuration} minutes today`}
        </p>
      </div>
    </div>
  );
};
