import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPage() {
  return (
    <div className="pointer-events-auto relative flex h-svh w-full flex-col items-center justify-center overflow-x-hidden overflow-y-scroll bg-custom-black-500 text-custom-white-400 max-sm:p-0">
      {/* blured circle  */}
      <div className="absolute aspect-square w-[600px] rounded-full bg-custom-orange-500 opacity-30 blur-[100px]" />
      {/* dashboard content */}
      <div className="absolute z-30 grid h-full w-full grid-cols-2 grid-rows-[auto,50%,40%] gap-3 py-4 pl-16 pr-4 max-sm:mb-10 max-sm:grid-cols-1 max-sm:grid-rows-[auto,50%,50%,70%,auto] max-sm:p-4 max-sm:py-8">
        <h1 className="col-span-2 text-3xl capitalize text-shadow-glow-sm max-sm:col-span-1">
          overview
        </h1>
        {/* pomodoro samary */}
        <Skeleton className="w-full h-full opacity-5" />
        {/* today todo's */}
        <Skeleton className="w-full h-full opacity-5" />
        {/* calendar */}
        <div className="col-span-2 h-full rounded-xl bg-custom-white-500/10 max-sm:col-span-1 max-sm:mb-10">
          <Skeleton className="w-full h-full opacity-5" />
        </div>
        {/* spacer  */}
        <div className="col-span-2 hidden h-16 max-sm:col-span-1 max-sm:block" />
      </div>
    </div>
  );
}
