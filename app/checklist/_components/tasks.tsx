import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

function Tasks() {
    // 
    return (
      <div className="flex h-full w-full flex-col rounded-lg bg-white/10 p-4">
        <span className="flex w-full items-center justify-between">
          <h1 className="text-2xl text-gray-400">Tasks</h1>
          <Button variant="ghost">
            <Plus />
          </Button>
        </span>

      </div>
    );
}

export default Tasks;