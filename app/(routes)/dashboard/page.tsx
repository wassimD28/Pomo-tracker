"use client"
import { PomodoroSamary } from "@/src/client/components/features/dashboard/pomodoroSamary";
import { TodayTodos } from "@/src/client/components/features/dashboard/todayTodos";
import dynamic from "next/dynamic";

// Fix the dynamic import by explicitly handling the default export
const CalendarComponent = dynamic(
  () => import("@/src/client/components/features/dashboard/calendar").then((mod) => mod.default),
  {
    loading: ()=> <div>loging...</div>,
    ssr: false,
  },
);

export default function DashboardPage() {

  

  return (
    <div className="pointer-events-auto relative flex h-svh w-full flex-col items-center justify-center overflow-x-hidden overflow-y-scroll bg-custom-black-500 text-custom-white-400 max-sm:p-0 2xl:pl-20 2xl:pr-16">
      {/* blured circle  */}
      <div className="absolute aspect-square w-[600px] rounded-full bg-custom-orange-500 opacity-30 blur-[100px]" />
      {/* dashboard content */}
      <div className="absolute z-30 grid h-full w-full grid-cols-2 grid-rows-[auto,50%,40%] gap-3 py-4 pl-16 pr-4 max-sm:mb-10 max-sm:grid-cols-1 max-sm:grid-rows-[auto,50%,50%,70%,auto] max-sm:p-4 max-sm:py-8 2xl:grid-rows-[auto,50%,42%]">
        <h1 className="col-span-2 text-3xl capitalize text-shadow-glow-sm max-sm:col-span-1 2xl:text-5xl">
          overview
        </h1>
        {/* pomodoro samary */}
        <PomodoroSamary />
        {/* today todo's */}
        <TodayTodos />
        {/* calendar */}
        <div className="col-span-2 h-full rounded-xl bg-custom-white-500/10 max-sm:col-span-1 max-sm:mb-10">
          <CalendarComponent />
        </div>
        {/* spacer  */}
        <div className="col-span-2 hidden h-16 max-sm:col-span-1 max-sm:block" />
      </div>
    </div>
  );
}
