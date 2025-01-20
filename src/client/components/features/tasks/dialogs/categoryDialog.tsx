"use client";
import { useState } from "react";
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
import { useCreateCategory } from "@/src/client/api/mutations/category/useCreateCategoy";

export function CreateCategoryDialog() {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const createCategory = useCreateCategory(setName, setIsOpen) // create category custom hook
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      createCategory.mutate(name);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="h-8 w-4 bg-transparent text-custom-white-200 hover:bg-white/10">
          <Plus size={10} className="scale-70 text-sm" />
        </Button>
      </DialogTrigger>
      <DialogContent className="border-none bg-white/10 backdrop-blur-sm sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="mb-1 text-custom-white-300">
              Create Category
            </DialogTitle>
            <DialogDescription>
              Make your category here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="name"
                className="text-right text-custom-white-300"
              >
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3 bg-white/10 text-custom-white-100 backdrop-blur-sm"
                disabled={createCategory.isPending}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-custom-orange-500/80 hover:bg-custom-orange-400"
              type="submit"
              disabled={createCategory.isPending || !name.trim()}
            >
              {createCategory.isPending ? "Creating..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
