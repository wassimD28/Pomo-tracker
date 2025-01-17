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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Category } from "@/src/shared/types/interfaces/common.interface";

export function CreateCategoryDialog() {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const createCategory = useMutation({
    mutationFn: async (categoryName: string) => {
      const response = await axios.post("/api/categories", {
        name: categoryName,
      });
      return response.data;
    },
    onMutate: async (newCategoryName) => {
      // Cancel any outgoing refetches to avoid overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey: ["categories"] });

      // Snapshot the previous value
      const previousCategories = queryClient.getQueryData<{
        status: string;
        data: Category[];
      }>(["categories"]);

      // Create a temporary ID for the optimistic update
      const tempId = Date.now();

      // Optimistically update the categories by adding the new one
      queryClient.setQueryData<{
        status: string;
        data: Category[];
      }>(["categories"], (old) => {
        if (!old)
          return {
            status: "success",
            data: [{ id: tempId, name: newCategoryName }],
          };
        return {
          ...old,
          data: [...old.data, { id: tempId, name: newCategoryName }],
        };
      });

      // Reset form and close dialog immediately for better UX
      setName("");
      setIsOpen(false);

      // Return the snapshot so we can rollback if something goes wrong
      return { previousCategories };
    },
    onError: (err, newCategory, context) => {
      // If the mutation fails, use the context we saved to roll back
      if (context?.previousCategories) {
        queryClient.setQueryData(["categories"], context.previousCategories);
      }
      console.error("Failed to create category:", err);
      // You might want to reopen the dialog here
      setIsOpen(true);
    },
    onSettled: () => {
      // Always refetch after error or success to ensure our local data is correct
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

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
