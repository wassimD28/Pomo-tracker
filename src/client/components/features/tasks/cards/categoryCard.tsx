import { Category } from "@/src/shared/types/interfaces/common.interface";
import { Button } from "@/src/client/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/src/client/components/ui/dropdown-menu";
import { Input } from "@/src/client/components/ui/input";
import { cn } from "@/src/shared/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Check, EllipsisVertical, PenBox, Trash2, X } from "lucide-react";
import { useState, useEffect } from "react";

interface CategoryCardProps {
  category: {
    name: string;
    id: number;
  };
  isSelected: boolean;
  onSelect: (index: number) => void;
}

function CategoryCard({ category, isSelected, onSelect }: CategoryCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(category.name);
  const queryClient = useQueryClient();

  // Reset name when category changes
  useEffect(() => {
    setName(category.name);
  }, [category.name]);

  const deleteCategory = useMutation({
    mutationFn: async (categoryId: number) => {
      const response = await axios.delete(`/api/categories/${categoryId}`);
      return response.data;
    },
    onMutate: async (categoryId) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });
      const previousCategories = queryClient.getQueryData<{
        status: string;
        data: Category[];
      }>(["categories"]);

      queryClient.setQueryData<{
        status: string;
        data: Category[];
      }>(["categories"], (old) => {
        if (!old) return { status: "success", data: [] };
        return {
          ...old,
          data: old.data.filter((cat) => cat.id !== categoryId),
        };
      });

      return { previousCategories };
    },
    onError: (err, categoryId, context) => {
      if (context?.previousCategories) {
        queryClient.setQueryData(["categories"], context.previousCategories);
      }
      console.error("Error deleting category:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

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

      setIsEditing(false);
      return { previousCategories };
    },
    onError: (err, newCategory, context) => {
      if (context?.previousCategories) {
        queryClient.setQueryData(["categories"], context.previousCategories);
      }
      setName(category.name); // Reset to original name on error
      console.error("Failed to update category:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (name.trim() && name !== category.name) {
        updateCategory.mutate(name);
      } else {
        setIsEditing(false);
        setName(category.name);
      }
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setName(category.name);
    }
  };

  const handleUpdate = () => {
    if (name.trim() && name !== category.name) {
      updateCategory.mutate(name);
    } else {
      setIsEditing(false);
      setName(category.name);
    }
  };

  return (
    <div
      onClick={() => !isEditing && onSelect(category.id)}
      className={cn(
        "group relative grid h-10 w-full cursor-pointer select-none grid-cols-[1fr_auto] items-center gap-1 rounded-md bg-transparent px-2 text-custom-white-200/70 duration-300 ease-out hover:bg-custom-white-400/10",
        isSelected && "bg-custom-white-200/10",
        isEditing && "px-2",
      )}
    >
      {isEditing ? (
        <div className="flex items-center gap-2">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyPress}
            autoFocus
            className="h-6 w-full rounded-md border-none bg-transparent px-2 py-2 text-custom-white-300"
          />
          <div className="flex gap-1">
            <Button
              onClick={handleUpdate}
              className="h-6 w-6 p-0.5"
              variant="ghost"
              disabled={!name.trim() || name === category.name}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => {
                setIsEditing(false);
                setName(category.name);
              }}
              className="h-6 w-6 p-0.5"
              variant="ghost"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <h1 className="text-sm">{category.name}</h1>
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
              onClick={() => deleteCategory.mutate(category.id)}
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

export default CategoryCard;
