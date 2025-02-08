"use client";

import dynamic from "next/dynamic";

const BigCalendarComponent = dynamic(
  () =>
    import("@/src/client/components/features/dashboard/bigCalendar").then(
      (mod) => mod.default,
    ),
  {
    loading: () => <div>loging...</div>,
    ssr: false,
  },
);
function CalendarPage() {
  return (
    <div className="pointer-events-auto relative flex h-svh w-full flex-col items-center  max-sm:p-2 max-sm:pb-16 justify-center overflow-hidden bg-custom-black-500 py-4 pl-16 2xl:pl-20 pr-4 text-custom-white-300">
      <BigCalendarComponent />
    </div>
  );
}

export default CalendarPage;
