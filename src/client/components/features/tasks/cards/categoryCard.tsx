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

import { Check, EllipsisVertical, PenBox, Trash2, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useDeleteCategory } from "@/src/client/api/mutations/category/useDeleteCategory";
import { useUpdateCategory } from "@/src/client/api/mutations/category/useUpdateCategory";
//import { useIsMobile } from "@/src/client/hooks/use-mobile";

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
  //const isMobile = useIsMobile();

  // Reset name when category changes
  useEffect(() => {
    setName(category.name);
  }, [category.name]);

  const deleteCategory = useDeleteCategory();

  const updateCategory = useUpdateCategory(setIsEditing, setName, category);

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
        "group relative grid h-10 cursor-pointer select-none grid-cols-[1fr_auto] items-center gap-1 rounded-md bg-transparent px-2 text-custom-white-500/70 duration-300 ease-out hover:bg-custom-white-400/10 max-sm:!w-32 max-sm:justify-center max-sm:rounded-full max-sm:bg-custom-white-500/10 xl:w-full max-sm:flex",
        isSelected &&
          "bg-custom-white-200/10 max-sm:bg-custom-white-500/25 max-sm:text-custom-white-200/90",
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
        <h1 className="text-sm max-sm:text-center">{category.name}</h1>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger className="max-sm:hidden" asChild>
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
