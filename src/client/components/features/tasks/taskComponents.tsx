import { useTaskCompQuery } from "@/src/client/api/queries/useTaskCompQuery";
import { useTaskStore } from "@/src/client/store/useTaskStore";
import TaskCompDialog from "./dialogs/taskCompDialong";
import { getLatestOrder, sortTaskCompByOrder } from "@/src/shared/utils/utils";
import { TaskComponent } from "@/src/shared/types/interfaces/taskComp.interface";

function TaskComponents() {
  const { activeTaskId } = useTaskStore();
  const { data, isLoading, isError } = useTaskCompQuery(activeTaskId);
  console.log('data from TC:', data);
  console.log("activeTaskId from TC: " + activeTaskId);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching task components</div>;
  }

  const showList = () => {
    const sortedTaskComps = sortTaskCompByOrder(data?.data);
    return (
      <div className="flex flex-col w-full gap-4">
        {sortedTaskComps.map((taskComponent: TaskComponent) => (
          <div
            className="w-full rounded p-2 bg-custom-white-200/10"
           key={taskComponent.id}>
            {taskComponent.content} - {taskComponent.order} - type {taskComponent.type}
          </div>
        )) || <div>No task components found</div>}
      </div>
    );
  };

  const showEmpty = () => {
    return <div className="flex flex-col justify-center items-center w-full h-full">
      <p className="text-custom-white-200/60">No task components found.</p>
      <p className="text-sm text-custom-white-200/30">Add a new task component.</p>
    </div>
  }

  return (
    <div className="flex h-full w-full flex-col rounded-lg bg-white/10 p-4">
      <span className="flex w-full items-center justify-between">
        <h1 className="text-2xl text-gray-400">Details</h1>
        <TaskCompDialog
          taskId={activeTaskId}
          latestOrder={getLatestOrder(data?.data)}
        />
      </span>
      {
        data?.data && data.data.length > 0? showList() : showEmpty()
      }
    </div>
  );
}

export default TaskComponents;
