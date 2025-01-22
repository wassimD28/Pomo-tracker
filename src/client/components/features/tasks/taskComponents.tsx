import { useTaskCompQuery } from "@/src/client/api/queries/useTaskCompQuery";
import { useTaskStore } from "@/src/client/store/useTaskStore";
import TaskCompDialog from "./dialogs/taskCompDialong";
import { getLatestOrder, sortTaskCompByOrder } from "@/src/shared/utils/utils";
import { TaskComponent } from "@/src/shared/types/interfaces/taskComp.interface";
import TaskCompCard from "./cards/taskCompCard";
import { Skeleton } from "@/components/ui/skeleton";

function TaskComponents() {
  const { activeTaskId } = useTaskStore();
  const { data, isLoading, isError } = useTaskCompQuery(activeTaskId);

  if (isLoading) {
    return (
      <div className="flex h-full w-full flex-col rounded-lg bg-white/10 p-4">
        <span className="flex w-full items-center justify-between">
          <h1 className="text-2xl text-gray-400">Details</h1>
        </span>
        <div className="w-ful flex h-full flex-col gap-4 py-4 opacity-20">
          <div className="flex w-full flex-col gap-3 rounded bg-white/10 p-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
          </div>
          <Skeleton className="aspect-video w-[60%]" />
        </div>
      </div>
    );
  }
  if (isError) {
    return <div>Error fetching task components</div>;
  }

  const showList = () => {
    const sortedTaskComps = sortTaskCompByOrder(data?.data);
    return (
      <div className="flex w-full flex-col gap-2 overflow-y-scroll duration-200 ease-in-out scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent hover:scrollbar-thumb-white/20">
        {sortedTaskComps.map((taskComponent: TaskComponent) => (
          <TaskCompCard key={taskComponent.id} taskComponent={taskComponent} />
        ))}
      </div>
    );
  };

  const showEmpty = () => {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <p className="text-custom-white-200/60">No task components found.</p>
        <p className="text-sm text-custom-white-200/30">
          Add a new task component.
        </p>
      </div>
    );
  };

  return (
    <div className="flex h-full w-full flex-col rounded-lg bg-white/10 p-4">
      <span className="flex w-full items-center justify-between">
        <h1 className="text-2xl text-gray-400">Details</h1>
        <TaskCompDialog
          taskId={activeTaskId}
          latestOrder={getLatestOrder(data?.data)}
        />
      </span>
      {data?.data && data.data.length > 0 ? showList() : showEmpty()}
    </div>
  );
}

export default TaskComponents;
