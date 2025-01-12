import { Task } from "@/app/types/interfaces/common.interface";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Plus } from "lucide-react";
import { useState } from "react";

interface TaskCreatePayload {
  categoryId: number;
  title: string;
}

interface TaskDialogProps {
  categoryId: number | null;
  disabled?: boolean;
}

function TaskDialog({ categoryId, disabled = false }: TaskDialogProps) {
  const [taskData, setTaskData] = useState<TaskCreatePayload>({
    categoryId: categoryId || 0,
    title: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const createTask = useMutation({
    mutationFn: async (task: TaskCreatePayload) => {
      const response = await axios.post("/api/tasks", {
        title: task.title,
        categoryId: task.categoryId,
      });
      return response.data;
    },
    onMutate: async (task) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousTasks = queryClient.getQueryData<{
        status: string;
        data: Task[];
      }>(["tasks"]);

      const tempId = Date.now();

      queryClient.setQueryData<{
        status: string;
        data: Task[];
      }>(["tasks"], (old) => {
        if (!old)
          return {
            status: "success",
            data: [
              {
                id: tempId,
                title: task.title,
                categoryId: task.categoryId,
                isCompleted: false,
              },
            ],
          };
        return {
          ...old,
          data: [
            ...old.data,
            {
              id: tempId,
              title: task.title,
              categoryId: task.categoryId,
              isCompleted: false,
            },
          ],
        };
      });

      setTaskData({ categoryId: categoryId || 0, title: "" });
      setIsOpen(false);

      return { previousTasks };
    },
    onError: (err, newTask, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
      console.error("Failed to create task:", err);
      setIsOpen(true);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskData.title.trim() && categoryId) {
      createTask.mutate({ ...taskData, categoryId });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="h-8 w-4 bg-transparent text-custom-white-200 hover:bg-white/10"
          disabled={disabled || !categoryId}
        >
          <Plus size={10} className="scale-70 text-sm" />
        </Button>
      </DialogTrigger>
      <DialogContent className="border-none bg-white/10 backdrop-blur-sm sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="mb-1 text-custom-white-300">
              Create Task
            </DialogTitle>
            <DialogDescription>
              Add a new task to this category. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="title"
                className="text-right text-custom-white-300"
              >
                Title
              </Label>
              <Input
                id="title"
                value={taskData.title}
                onChange={(e) =>
                  setTaskData({ ...taskData, title: e.target.value })
                }
                className="col-span-3 bg-white/10 text-custom-white-100 backdrop-blur-sm"
                disabled={createTask.isPending}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-custom-orange-500/80 hover:bg-custom-orange-400"
              type="submit"
              disabled={
                createTask.isPending || !taskData.title.trim() || !categoryId
              }
            >
              {createTask.isPending ? "Creating..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TaskDialog;
