// TaskCard.tsx
"use client";
import { Task } from "@/app/types/interfaces/common.interface";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, EllipsisVertical, PenBox, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useTaskStore } from "@/app/store/useTaskStore";

interface TaskCardProps {
  task: Task;
}

function TaskCard({ task }: TaskCardProps) {
  const {setActiveTask, activeTask}= useTaskStore()
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState<Task>(task);
  const queryClient = useQueryClient();

  const updateTask = useMutation({
    mutationFn: async (newTaskValue: Task) => {
      const response = await axios.put(`/api/tasks/${task.id}`, {
        categoryId: newTaskValue.categoryId,
        title: newTaskValue.title,
        isCompleted: newTaskValue.isCompleted,
      });
      return response.data;
    },
    onMutate: async (newTaskValue) => {
      await queryClient.cancelQueries({ queryKey: ["tasks", task.categoryId] });
      const previousTasks = queryClient.getQueryData<{
        status: string;
        data: Task[];
      }>(["tasks", task.categoryId]);

      queryClient.setQueryData<{
        status: string;
        data: Task[];
      }>(["tasks", task.categoryId], (old) => {
        if (!old) return { status: "success", data: [] };
        return {
          ...old,
          data: old.data.map((oldTask) =>
            oldTask.id === task.id ? newTaskValue : oldTask,
          ),
        };
      });

      return { previousTasks };
    },
    onError: (err, newTaskValue, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(
          ["tasks", task.categoryId],
          context.previousTasks,
        );
      }
      setUpdatedTask(task);
      console.error("Failed to update task:", err);
    },
    onSuccess: () => {
      setIsEditing(false);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", task.categoryId] });
    },
  });

  const deleteTask = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(`/api/tasks/${task.id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", task.categoryId] });
    },
  });

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

  return (
    <div
      onClick={()=> setActiveTask(task)}
      className={cn(
        "group relative grid h-10 w-full cursor-pointer select-none grid-cols-[auto_1fr_auto] items-center justify-start gap-2 rounded-md bg-transparent px-2 text-custom-white-200/70 duration-300 ease-out hover:bg-custom-white-400/10",
        isEditing && "grid-cols-[1fr_auto] px-2",
        activeTask?.id === task.id && "bg-custom-white-200/20"
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
              "text-sm text-gray-400",
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
          className="w-32 border-none bg-custom-white-200/20 text-custom-white-200 backdrop-blur-md"
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
