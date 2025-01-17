"use client";
import { Task } from "@/src/shared/types/interfaces/common.interface";
import { Checkbox } from "@/src/client/components/ui/checkbox";

export const TodayTodos = () => {
  const tasks: Partial<Task>[] = [
    {
      title: "do homework",

      isCompleted: false,
    },
    {
      title: "make dinner",

      isCompleted: false,
    },
    {
      title: "study",

      isCompleted: false,
    },
    {
      title: "exercise",

      isCompleted: false,
    },
    {
      title: "sleep",

      isCompleted: true,
    },
  ];

  return (
    <div className="flex flex-col rounded-xl bg-custom-white-500/10 py-4 pl-4 pr-2">
      <h1 className="text-xl font-bold capitalize text-custom-white-500">
        today todo&apos;s
      </h1>
      <div className="flex h-full flex-col items-start justify-center overflow-y-scroll scrollbar scrollbar-track-transparent scrollbar-thumb-custom-white-500/25">
        {tasks.length > 0 &&
          tasks.map((task, index) => (
            <div key={index} className="w-full">
              <div className="flex w-full items-center gap-4 py-2">
                <Checkbox
                  className="h-4 w-4 rounded-md"
                  checked={task.isCompleted}
                />
                <p className="text-custom-white-500/70">{task.title}</p>
              </div>
              {index < tasks.length - 1 && (
                <hr className="w-full border-custom-white-400/10" />
              )}
            </div>
          ))}
        {tasks.length == 0 && (
          <p className="text-custom-white-500/50 first-letter:uppercase">
            there are no tasks for this day.
          </p>
        )}
      </div>
    </div>
  );
};
