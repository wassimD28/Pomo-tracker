"use client"
import { Category } from "@/app/types/interfaces/common.interface";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

function Categories() {
  const categories: Omit<Category, "id">[] = [];

  const showList = () => {
    return (
      <div className="flex h-full w-full flex-col">
        {categories.map((category, index) => (
          <div key={index} className="flex w-full items-center gap-4 py-2">
            <p className="text-gray-400">{category.name}</p>
          </div>
        ))}
      </div>
    );
  };

  const showEmpty = () => {
    return (
      <div className="text-center text-gray-400">No categories found.</div>
    );
  };

  return (
    <div className="flex h-full w-full flex-col rounded-lg bg-white/10 p-4">
      <span className="flex w-full items-center justify-between">
        <h1 className="text-2xl text-gray-400">Categories</h1>
        <Button variant="ghost">
          <Plus />
        </Button>
      </span>

      {categories.length > 0 ? showList() : showEmpty()}
    </div>
  );
}

export default Categories;
