"use client"
import { usePomoStore } from "@/app/store/usePomoStore";
import Image from "next/image";
export const PomodoroSamary = () => {
    const {pomoSession} = usePomoStore();
    const toatalFocusDuration = ~~(pomoSession.duration/60)
  return (
    <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-custom-maroon-700">
      {/* blured circle  */}
      <div className="absolute left-14 aspect-square w-56 rounded-full bg-custom-tomato-400 blur-[70px]"></div>
      <Image
        className="absolute left-20 z-20"
        src="/tomato-icon.svg"
        alt="tomato icon"
        width={180}
        height={38}
        priority
      />
      {/* text  */}
      <div className="absolute right-10 top-10 flex flex-col">
        <h1 className="text-6xl font-bold capitalize text-custom-white-500">
          good job!
        </h1>
        <p className="text-sm pl-2 text-custom-white-500/50 capitalize">
          {`You have focused for ${toatalFocusDuration} minutes today`}
        </p>
      </div>
    </div>
  );
};
