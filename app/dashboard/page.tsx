"use client"
import { PomodoroSamary } from "./_components/pomodoroSamary";
import { TodayTodos } from "./_components/todayTodos";
import dynamic from "next/dynamic";

// Fix the dynamic import by explicitly handling the default export
const CalendarComponent = dynamic(
  () => import("./_components/calendar").then((mod) => mod.default),
  {
    loading: ()=> <div>loging...</div>,
    ssr: false,
  },
);

export default function DashboardPage() {
  return (
    <div className="relative flex h-svh w-full flex-col items-center justify-center overflow-hidden bg-custom-black-500 text-custom-white-400">
      {/* blured circle  */}
      <div className="absolute aspect-square w-[600px] rounded-full bg-custom-orange-500 opacity-30 blur-[100px]" />
      {/* dashboard content */}
      <div className="absolute z-30 grid h-full w-full grid-cols-2 grid-rows-[auto,50%,40%] gap-3 py-4 pl-16 pr-4">
        <h1 className="col-span-2 text-3xl capitalize text-shadow-glow-sm">
          overview
        </h1>
        {/* today todo's */}
        <TodayTodos />
        {/* pomodoro samary */}
        <PomodoroSamary />
        {/* calendar */}
        <div className="col-span-2 h-full rounded-xl bg-custom-white-500/10">
          <CalendarComponent />
        </div>
      </div>
    </div>
  );
}
