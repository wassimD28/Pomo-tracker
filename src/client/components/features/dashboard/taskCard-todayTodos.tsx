// TaskCard.tsx
"use client";
import { Task } from "@/src/shared/types/interfaces/common.interface";
import { Checkbox } from "@/src/client/components/ui/checkbox";
import { Label } from "@/src/client/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/src/client/components/ui/dropdown-menu";
import { Check, EllipsisVertical, PenBox, Trash2, X } from "lucide-react";
import { cn } from "@/src/shared/utils/utils";
import { useState } from "react";
import { Button } from "@/src/client/components/ui/button";
import { Input } from "@/src/client/components/ui/input";
import { useUpdateTask } from "@/src/client/api/mutations/task/useUpdateTask";
import { useDeleteTask } from "@/src/client/api/mutations/task/useDeleteTask";

interface TaskCardProps {
  task: Task;
}

function TaskCard({ task }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState<Task>(task);

  const updateTask = useUpdateTask(setUpdatedTask, setIsEditing, task);

  const deleteTask = useDeleteTask(task);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (updatedTask.title.trim() && updatedTask.title !== task.title) {
        updateTask.mutate(updatedTask);
      } else {
        setIsEditing(false);
        setUpdatedTask(task);
      }
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setUpdatedTask(task);
    }
  };

  const handleUpdate = () => {
    if (updatedTask.title.trim() && updatedTask.title !== task.title) {
      updateTask.mutate(updatedTask);
    } else {
      setIsEditing(false);
      setUpdatedTask(task);
    }
  };

  const handleCheckboxChange = () => {
    const newTask = {
      ...updatedTask,
      isCompleted: !updatedTask.isCompleted,
    };
    setUpdatedTask(newTask);
    updateTask.mutate(newTask);
  };

  // If the task is being deleted, show a fade-out animation
  if (deleteTask.isPending) {
    return (
      <div className="animate-fadeOut grid h-10 w-full grid-cols-[auto_1fr_auto] items-center gap-2 rounded-md bg-custom-white-200/5 px-2 opacity-50">
        <div className="h-4 w-4 rounded bg-custom-white-200/20" />
        <div className="h-4 w-full rounded bg-custom-white-200/20" />
      </div>
    );
  }

  // If there's an error, show an error state
  if (deleteTask.isError) {
    return (
      <div className="grid h-10 w-full grid-cols-[auto_1fr_auto] items-center gap-2 rounded-md bg-red-500/10 px-2">
        <Checkbox
          id={updatedTask.id.toString()}
          checked={updatedTask.isCompleted}
          className="h-4 w-4 rounded border-red-300"
        />
        <Label className="text-sm font-normal text-red-300">
          {updatedTask.title}
        </Label>
        <Button
          onClick={() => deleteTask.reset()}
          className="h-6 w-6 rounded-full bg-red-500/20 p-1 hover:bg-red-500/30"
          variant="ghost"
        >
          <X className="h-4 w-4 text-red-300" />
        </Button>
      </div>
    );
  }
  return (
    <div
      
      className={cn(
        "group relative grid h-10 w-full cursor-pointer select-none grid-cols-[auto_1fr_auto] items-center justify-start gap-2 rounded-md bg-transparent px-2 text-custom-white-200/70 duration-300 ease-out hover:bg-custom-white-400/10",
        isEditing && "grid-cols-[1fr_auto] px-2",
      )}
    >
      {isEditing ? (
        <div className="flex items-center gap-2">
          <Input
            type="text"
            value={updatedTask.title}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, title: e.target.value })
            }
            onKeyDown={handleKeyPress}
            autoFocus
            className="h-6 w-full rounded-md border-none bg-transparent px-2 py-2 text-custom-white-300"
          />
          <div className="flex gap-1">
            <Button
              onClick={handleUpdate}
              className="h-6 w-6 p-0.5"
              variant="ghost"
              disabled={
                !updatedTask.title.trim() || updatedTask.title === task.title
              }
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => {
                setIsEditing(false);
                setUpdatedTask(task);
              }}
              className="h-6 w-6 p-0.5"
              variant="ghost"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <>
          <Checkbox
            id={updatedTask.id.toString()}
            checked={updatedTask.isCompleted}
            onCheckedChange={handleCheckboxChange}
            className="h-4 w-4 rounded border-gray-300"
          />
          <Label
            className={cn(
              "text-sm font-normal text-custom-white-200/60",
              updatedTask.isCompleted && "line-through opacity-50",
            )}
          >
            {updatedTask.title}
          </Label>
        </>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className={cn(
              "absolute right-2 h-8 w-3 opacity-0 duration-300 ease-out hover:bg-custom-white-200/30 hover:text-custom-white-200 group-hover:opacity-100",
              isEditing && "pointer-events-none group-hover:opacity-0",
            )}
            variant="ghost"
          >
            <EllipsisVertical className="scale-75" size={10} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 border-none bg-custom-white-200/20 text-custom-white-200 backdrop-blur-md"
          side="right"
        >
          <DropdownMenuRadioGroup>
            <DropdownMenuRadioItem
              onClick={() => setIsEditing(true)}
              value="edit"
              className="flex w-full cursor-pointer items-center gap-4 rounded-md px-2 hover:bg-custom-white-200/10 hover:text-custom-white-200"
            >
              <PenBox />
              <h2>Edit</h2>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              onClick={() => deleteTask.mutate()}
              className="flex cursor-pointer items-center gap-4 rounded-md px-2 hover:bg-custom-white-200/10 hover:text-custom-white-200"
              value="delete"
            >
              <Trash2 />
              <h2>Delete</h2>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default TaskCard;
