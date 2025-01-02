import { CalendarDays, Clock, House, ListCheck, Settings } from "lucide-react";

export const SideBar = () => {
  return (
    <div className="fixed z-50 flex h-full flex-col items-center justify-between px-4 py-4 text-custom-white-200">
      <div className="flex flex-col gap-8">
        <House />
        <Clock />
        <CalendarDays />
        <ListCheck />
      </div>
      <Settings />
    </div>
  );
};
