import { cn } from "@/src/shared/utils/utils";
import { Link, Link2, Search, Unlink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "../../ui/input";
import { usePomoStore } from "@/src/client/store/usePomoStore";
import { useTaskSearchQuery } from "@/src/client/api/queries/useTaskSearchQuery";
import { useDebounce } from "@/src/client/hooks/useDebounce";
import { FoundTask } from "@/src/shared/types/interfaces/common.interface";
import LoadingSpinner from "../../loadingSpinner";
import { useTaskSearchBarStore } from "@/src/client/store/useTaskSearchBarStore";

function TaskSearchBar() {
  const { isSearching, setIsSearching } = useTaskSearchBarStore();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { data: searchResults, isLoading } =
    useTaskSearchQuery(debouncedSearchTerm);
  const { pomoSession, setTargetTask, removeTargetTask } = usePomoStore();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleLinkTask = (task: FoundTask) => {
    setTargetTask(task);
    setIsSearching(false);
    setSearchTerm("");
  };
  const handleUnlinkTask = () => {
    removeTargetTask();
    setIsSearching(false);
    setSearchTerm("");
  };

  useEffect(() => {
    if (isSearching) {
      inputRef.current?.focus();
    }
  }, [isSearching]);
  return (
    <div
      className={cn(
        "absolute top-32 flex items-center justify-center transition-all duration-500 ease-custom-ease max-sm:top-20",
        (pomoSession.isStarted || pomoSession.isEnded) &&
          "pointer-events-none top-0 select-none opacity-0",
      )}
    >
      <div
        className={cn(
          "absolute -left-20 w-72 transition-all duration-500 ease-custom-ease",
          isSearching && "translate-x-32 opacity-0",
        )}
      >
        {pomoSession.target ? (
          <div className="flex w-full flex-col">
            <small className="text-xs opacity-50">Linked to</small>
            <h2 className="opacity-95">{pomoSession.target.title}</h2>
          </div>
        ) : (
          "Want to link a task?"
        )}
      </div>
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
          ref={inputRef}
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
        <div className="absolute top-full mt-9 flex w-80 justify-center rounded-lg bg-custom-tomato-700 p-2 text-custom-white-500">
          {`No tasks found with title "${searchTerm}".`}
        </div>
      )}
      {/* show loading spinner */}
      {isLoading && (
        <div className="absolute top-full mt-9 flex w-80 justify-center rounded-lg bg-custom-tomato-700 p-2">
          <LoadingSpinner className="fill-custom-tomato-400" />
        </div>
      )}
      {/* Search results dropdown */}
      {searchResults && searchResults.length > 0 && (
        <div
          className={cn(
            "absolute top-full z-20 mt-9 h-44 w-80 overflow-y-scroll rounded-lg bg-custom-tomato-700 shadow-lg transition-all duration-500 ease-custom-ease",
            !isSearching && "pointer-events-none h-0 select-none",
          )}
        >
          {searchResults.map((task: FoundTask) => (
            <div
              key={task.id}
              className={cn(
                "group grid w-full grid-cols-[1fr_auto] grid-rows-[auto_auto] items-center overflow-hidden bg-custom-tomato-700 p-2 transition-colors hover:bg-custom-tomato-500",
                pomoSession.target &&
                  pomoSession.target.id === task.id &&
                  "bg-custom-tomato-600",
              )}
            >
              <p className="text-xs opacity-40">{task.category.name}</p>
              {pomoSession.target && pomoSession.target.id === task.id ? (
                <Unlink
                  onClick={() => handleUnlinkTask()}
                  className="row-span-2 mr-2 size-5 translate-x-5 cursor-pointer opacity-0 transition-all duration-300 ease-in-out hover:scale-110 group-hover:translate-x-0 group-hover:opacity-95 max-sm:translate-x-0 max-sm:opacity-95"
                />
              ) : (
                <Link2
                  onClick={() => handleLinkTask(task)}
                  className="row-span-2 mr-2 size-6 translate-x-5 -rotate-45 cursor-pointer opacity-0 transition-all duration-300 ease-in-out hover:scale-110 group-hover:translate-x-0 group-hover:opacity-95 max-sm:translate-x-0 max-sm:opacity-95"
                />
              )}
              <h1 className="text-custom-white-500/90">{task.title}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskSearchBar;
