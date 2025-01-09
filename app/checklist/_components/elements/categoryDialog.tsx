"use client";
import { useState } from "react";
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
import { Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function CreateCategoryDialog() {
  // State management
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Get QueryClient instance to invalidate queries after mutation
  const queryClient = useQueryClient();

  // Create mutation hook
  const createCategory = useMutation({
    mutationFn: async (categoryName: string) => {
      const response = await axios.post("/api/categories", {
        name: categoryName,
      });
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch categories query
      queryClient.invalidateQueries({ queryKey: ["categories"] });

      // Reset form and close dialog
      setName("");
      setIsOpen(false);
    },
    onError: (error) => {
      // Handle error case - you might want to show a toast notification here
      console.error("Failed to create category:", error);
    },
  });

  // Form submission handler
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
