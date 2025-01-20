import { Button } from "@/src/client/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/client/components/ui/dialog";
import { Input } from "@/src/client/components/ui/input";
import { Label } from "@/src/client/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";
import { TaskCreatePayload } from "@/src/shared/types/interfaces/task.interface";
import { useCreateTask } from "@/src/client/api/mutations/task/useCreateTask";



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

  

  const createTask = useCreateTask(setTaskData, setIsOpen, categoryId)

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
