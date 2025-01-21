"use client";
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
import { Label } from "@/src/client/components/ui/label";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { TaskCompCreatePayload } from "@/src/shared/types/interfaces/taskComp.interface";
import { ContentType } from "@/src/shared/types/enum/common.enum";
import { useCreateTaskComp } from "@/src/client/api/mutations/taskComp/useCreateTaskComp";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskDialogProps {
  taskId: number | null;
  latestOrder: number;
}

function TaskCompDialog({ taskId, latestOrder }: TaskDialogProps) {
  console.log("active taskId from TC diag: " + taskId);
  const [taskCompData, setTaskCompData] = useState<TaskCompCreatePayload>({
    taskId: taskId ?? 0,
    order: latestOrder + 1,
    content: "",
    type: ContentType.text,
  });
  const [isOpen, setIsOpen] = useState(false);
  const createTaskComp = useCreateTaskComp(setTaskCompData, setIsOpen);

  // Update useEffect to maintain valid values
  useEffect(() => {
    if (taskId) {
      // Only update if taskId exists
      setTaskCompData((prev) => ({
        ...prev,
        taskId: taskId,
        order: Math.max(1, latestOrder + 1),
      }));
    }
  }, [taskId, latestOrder]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskId && taskCompData.content.trim() && taskCompData.type) {
      // Ensure we're sending valid data
      const validPayload = {
        ...taskCompData,
        taskId: taskId,
        order: Math.max(1, taskCompData.order),
        content: taskCompData.content.trim(),
      };
      createTaskComp.mutate(validPayload);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="h-8 w-4 bg-transparent text-custom-white-200 hover:bg-white/10"
          disabled={!taskId}
        >
          <Plus size={10} className="scale-70 text-sm" />
        </Button>
      </DialogTrigger>
      <DialogContent className="border-none bg-white/10 backdrop-blur-sm sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="mb-1 text-custom-white-300">
              Create Task Component
            </DialogTitle>
            <DialogDescription>
              Add a new task component to this task. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* content field  */}
            <div className="flex flex-col items-start gap-4">
              <Label
                htmlFor="content"
                className="text-right text-custom-white-300"
              >
                Content
              </Label>
              <Textarea
                id="content"
                value={taskCompData.content}
                onChange={(e) =>
                  setTaskCompData({ ...taskCompData, content: e.target.value })
                }
                className="col-span-3 bg-white/10 text-custom-white-100 backdrop-blur-sm"
                disabled={createTaskComp.isPending}
              />
            </div>
            {/* type field */}
            <div className="flex flex-col items-start gap-4">
              <Label
                htmlFor="type"
                className="text-right text-custom-white-300"
              >
                Type
              </Label>
              <Select
                value={taskCompData.type}
                onValueChange={(value) =>
                  setTaskCompData({
                    ...taskCompData,
                    type: value as ContentType,
                  })
                }
              >
                <SelectTrigger className="w-full bg-white/10 text-custom-white-200 backdrop-blur-sm">
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent className="bg-custom-white-200/10 text-custom-white-200 backdrop-blur-sm">
                  <SelectGroup>
                    {Object.values(ContentType).map((type) => (
                      <SelectItem
                        key={type}
                        className="rounded first-letter:uppercase"
                        value={type}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-custom-orange-500/80 hover:bg-custom-orange-400"
              type="submit"
              disabled={
                createTaskComp.isPending ||
                !taskCompData.content.trim() ||
                taskCompData.type === undefined ||
                !taskId
              }
            >
              {createTaskComp.isPending ? "Creating..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TaskCompDialog;
