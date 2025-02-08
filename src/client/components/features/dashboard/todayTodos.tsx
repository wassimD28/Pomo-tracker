"use client";
import { useTodayTodosQuery } from "@/src/client/api/queries/useTodayTodosQuery";
import { Skeleton } from "@/components/ui/skeleton";
import TaskCard from "./taskCard-todayTodos";

export const TodayTodos = () => {
  const { data , isLoading } = useTodayTodosQuery();
  console.log("data :", data);

  const tasks = data?.data

  if (isLoading) {
    
    return (
    <div className="flex flex-col rounded-xl bg-custom-white-500/10 py-4 pl-4 pr-2 max-sm:col-span-1">
      <h1 className="text-xl font-bold capitalize text-custom-white-500">
        today todo&apos;s
      </h1>
      <div className="flex h-full gap-4 pt-4 flex-col items-start justify-start overflow-y-scroll scrollbar scrollbar-track-transparent scrollbar-thumb-custom-white-500/25">
        <Skeleton className="w-full h-4 opacity-5" />
        <Skeleton className="w-full h-4 opacity-5" />
        <Skeleton className="w-full h-4 opacity-5" />
        <Skeleton className="w-full h-4 opacity-5" />
      </div>
    </div>
  );
  }

  return (
    <div className="flex flex-col rounded-xl bg-custom-white-500/10 py-4 pl-4 pr-2 max-sm:col-span-1">
      <h1 className="text-xl font-bold capitalize text-custom-white-500">
        today todo&apos;s
      </h1>
      <div className="flex h-full flex-col items-start justify-start overflow-y-scroll scrollbar scrollbar-track-transparent scrollbar-thumb-custom-white-500/25">
        {tasks && tasks.length > 0 &&
          tasks.map((task) => (
           <TaskCard key={task.id} task={task}/>
          ))}
        {tasks && tasks.length == 0 && (
          <p className="text-custom-white-500/50 first-letter:uppercase">
            there are no tasks for this day.
          </p>
        )}
      </div>
    </div>
  );
};
