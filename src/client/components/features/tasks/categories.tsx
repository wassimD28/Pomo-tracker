"use client";
import { Loader2 } from "lucide-react";
import { CreateCategoryDialog } from "./dialogs/categoryDialog";
import CategoryCard from "./cards/categoryCard";
import { useState } from "react";
import { useCategoryStore } from "@/src/client/store/useCategoryStore";
import { useCategoryQuery } from "@/src/client/api/queries/useCatigoryQuery";
import { Category } from "@/src/shared/types/interfaces/common.interface";


function Categories() {
  const { setCategory } = useCategoryStore();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>();
  // Fetching categories
  const { data, isLoading, isError } = useCategoryQuery()

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-full w-full flex-col rounded-lg bg-white/10 p-4">
        <span className="flex w-full items-center justify-between">
          <h1 className="text-2xl text-gray-400">Categories</h1>
        </span>
        <div className="flex h-full w-full items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex h-full w-full flex-col rounded-lg bg-white/10 p-4">
        <span className="flex w-full items-center justify-between">
          <h1 className="text-2xl text-gray-400">Categories</h1>
        </span>
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-center text-red-400">
            Error loading categories. Please try again.
          </p>
        </div>
      </div>
    );
  }
  const handleSelectedCategory = (index: number): void => {
    setSelectedCategoryIndex(index);
    const categoryName = categories.find((category : Category) => category.id === index)?.name;
    // console log index and category name
    console.log("category id :", index);
    console.log("category name :", categoryName);
    setCategory(index, categoryName ?? null);
  };

  const categories = data?.data || [];
  const showList = () => {
    return (
      <div className="flex h-full w-full flex-col space-y-2">
        {categories.map((category : Category) => (
          <CategoryCard
            key={category.id}
            category={category}
            isSelected={selectedCategoryIndex === category.id}
            onSelect={handleSelectedCategory}
          />
        ))}
      </div>
    );
  };

  const showEmpty = () => {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center text-gray-400">
          <p>No categories found.</p>
          <p className="text-sm">Click the plus button to create one.</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full w-full flex-col rounded-lg bg-white/10 p-4">
      <span className="mb-4 flex w-full items-center justify-between">
        <h1 className="text-2xl text-gray-400">Categories</h1>
        <CreateCategoryDialog />
      </span>
      {categories.length > 0 ? showList() : showEmpty()}
    </div>
  );
}

export default Categories;
