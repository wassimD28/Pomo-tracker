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
import { PenBox } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Category } from "@/app/types/interfaces/common.interface";

interface UpdateCategoryDialogProps {
  category: Category;
}

export function UpdateCategoryDialog({ category }: UpdateCategoryDialogProps) {
  const [name, setName] = useState(category.name);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const updateCategory = useMutation({
    mutationFn: async (categoryName: string) => {
      const response = await axios.put(`/api/categories/${category.id}`, {
        name: categoryName,
      });
      return response.data;
    },
    onMutate: async (newCategoryName) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });

      const previousCategories = queryClient.getQueryData<{
        status: string;
        data: Category[];
      }>(["categories"]);

      // Optimistically update the category
      queryClient.setQueryData<{
        status: string;
        data: Category[];
      }>(["categories"], (old) => {
        if (!old) return { status: "success", data: [] };
        return {
          ...old,
          data: old.data.map((cat) =>
            cat.id === category.id ? { ...cat, name: newCategoryName } : cat,
          ),
        };
      });

      setIsOpen(false);

      return { previousCategories };
    },
    onError: (err, newCategory, context) => {
      if (context?.previousCategories) {
        queryClient.setQueryData(["categories"], context.previousCategories);
      }
      console.error("Failed to update category:", err);
      setIsOpen(true);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      updateCategory.mutate(name);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild onClick={handleEditClick}>
        <div className="flex w-full cursor-pointer items-center gap-4 rounded-md px-2 hover:bg-custom-white-200/10 hover:text-custom-white-200">
          <PenBox />
          <h2>Edit</h2>
        </div>
      </DialogTrigger>
      <DialogContent className="border-none bg-white/10 backdrop-blur-sm sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="mb-1 text-custom-white-300">
              Update Category
            </DialogTitle>
            <DialogDescription>
              Update your category name here. Click save when you&apos;re done.
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
                disabled={updateCategory.isPending}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-custom-orange-500/80 hover:bg-custom-orange-400"
              type="submit"
              disabled={updateCategory.isPending || !name.trim()}
            >
              {updateCategory.isPending ? "Updating..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
