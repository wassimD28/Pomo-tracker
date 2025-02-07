import { cn } from "@/src/shared/utils/utils";
import { Link, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "../../ui/input";
import { usePomoStore } from "@/src/client/store/usePomoStore";
import { useTaskSearchQuery } from "@/src/client/api/queries/useTaskSearchQuery";
import { useDebounce } from "@/src/client/hooks/useDebounce";
import { FoundTask } from "@/src/shared/types/interfaces/common.interface";
import LoadingSpinner from "../../loadingSpinner";
import { useTaskSearchBarStore } from "@/src/client/store/useTaskSrearchBarStore";

function TaskSearchBar() {
  const { isSearching, setIsSearching } = useTaskSearchBarStore()
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { data: searchResults, isLoading } = useTaskSearchQuery(debouncedSearchTerm);
  //const { mutate: linkTask } = useLinkTaskWithPomo();
  const { pomoSession } = usePomoStore();

  const handleTaskSelect = (taskId: number) => {
    // if (pomoSession.) {
    //   linkTask({
    //     sessionId: pomoSession.id,
    //     taskId,
    //   });
    // }
    console.log(taskId);
    setIsSearching(false);
    setSearchTerm("");
  };
  return (
    <div
      className={cn(
        "absolute top-32 flex items-center justify-center transition-all duration-500 ease-custom-ease",
        (pomoSession.isStarted || pomoSession.isEnded) &&
          "pointer-events-none top-0 select-none opacity-0",
      )}
    >
      <h1
        className={cn(
          "absolute -left-20 w-72 opacity-90 transition-all duration-500 ease-custom-ease",
          isSearching && "translate-x-32 opacity-0",
        )}
      >
        Want to link to a task?
      </h1>
      <div
        className={cn(
          "pointer-events-auto absolute z-10 flex w-16 -translate-x-32 cursor-pointer items-center justify-center gap-4 rounded-full bg-gradient-to-b from-custom-tomato-400 to-custom-tomato-500/50 p-3 text-custom-white-500 opacity-100 shadow-inner shadow-black/30 transition-all duration-500 ease-custom-ease",
          isSearching && "w-80 -translate-x-0",
        )}
      >
        <Link
          className={cn(
        "absolute transition-all duration-500 ease-custom-ease",
        isSearching && "-translate-x-32",
          )}
          onClick={() => setIsSearching(!isSearching)}
        />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tasks..."
          className={cn(
        "pointer-events-none ml-0 w-0 rounded-full bg-custom-tomato-700 opacity-0 transition-all duration-500 ease-custom-ease placeholder:text-custom-white-500/50 focus:border-2 focus:border-custom-tomato-400",
        isSearching && "pointer-events-auto ml-10 w-64 opacity-100",
          )}
        />
        <Search
          className={cn(
        "pointer-events-none absolute right-6 opacity-0 transition-all duration-500 ease-custom-ease",
        isSearching && "pointer-events-auto opacity-60",
          )}
        />
      </div>
      {/* show empty message if no search results */}
      {!isLoading && searchResults && searchResults.length === 0 && (
        <div className="absolute top-full mt-9 bg-custom-tomato-700 rounded-lg flex w-80 justify-center p-2 text-custom-white-500">
          {`No tasks found with title "${searchTerm}".`}
        </div>
      )}
      {/* show loading spinner */}
      {isLoading && (
        <div className="absolute top-full mt-9 bg-custom-tomato-700 rounded-lg flex w-80 justify-center p-2">
          <LoadingSpinner className="fill-custom-tomato-400"/>
        </div>
      )}
      {/* Search results dropdown */}
      {searchResults && searchResults.length > 0 && (
        <div className={cn("absolute top-full z-20 mt-9 overflow-y-scroll w-80 h-44 rounded-lg bg-custom-tomato-700 shadow-lg transition-all ease-custom-ease duration-500", !isSearching && " pointer-events-none select-none h-0")}>
          {searchResults.map((task : FoundTask) => (
            <div
              key={task.id}
              onClick={() => handleTaskSelect(task.id)}
              className="cursor-pointer flex flex-col p-2 transition-colors hover:bg-custom-tomato-600 w-full bg-custom-tomato-700"
            >
              <p className="text-xs opacity-40">{task.category.name}</p>
              <h1 className="text-custom-white-500/90">
              {task.title}
              </h1>
            </div>
          ))}
        </div>
      )}

      {/* Link status indicator */}
      {pomoSession.target && (
        <div className="absolute bottom-full mb-2 text-sm text-green-300">
          Linked to: {pomoSession.target?.title}
        </div>
      )}
    </div>
  );
}

export default TaskSearchBar;
