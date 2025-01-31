"use client";
import { CreateCategoryDialog } from "./dialogs/categoryDialog";
import CategoryCard from "./cards/categoryCard";
import { useEffect, useState } from "react";
import { useCategoryStore } from "@/src/client/store/useCategoryStore";
import { useCategoryQuery } from "@/src/client/api/queries/useCatigoryQuery";
import { Category } from "@/src/shared/types/interfaces/common.interface";
import { Skeleton } from "@/components/ui/skeleton";


function Categories() {
  const { setCategory } = useCategoryStore();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>();
  // Fetching categories
  const { data, isLoading, isError } = useCategoryQuery()

  // select the first category when loading
  useEffect(() => {
    const categories = data?.data || [];
    if (categories.length > 0) {
      setSelectedCategoryIndex(categories[0].id);
      setCategory(categories[0].id, categories[0].name);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data])

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-full w-full flex-col rounded-lg bg-white/10 p-4">
        <span className="flex w-full items-center justify-between">
          <h1 className="text-2xl text-custom-white-500 max-sm:font-semibold">
            Categories
          </h1>
        </span>
        <div className="w-ful flex h-full flex-col gap-2 py-4 opacity-20">
          <div className="flex w-full gap-3 rounded bg-white/10 p-3">
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex h-full w-full flex-col rounded-lg bg-white/10 p-4">
        <span className="flex w-full items-center justify-between">
          <h1 className="text-2xl text-custom-white-500 max-sm:font-semibold">
            Categories
          </h1>
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
      <div className="flex overflow-scroll max-sm:gap-1 max-sm:w-fit w-full flex-col space-y-2 max-sm:space-y-0 max-sm:flex-row max-sm:flex-nowrap">
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
    <div className="flex h-full max-sm:h-fit w-full flex-col rounded-lg bg-white/10 p-4 max-sm:p-0 max-sm:bg-transparent">
      <span className="mb-4 flex w-full items-center justify-between">
        <h1 className="text-2xl text-custom-white-500 max-sm:font-semibold">Categories</h1>
        <CreateCategoryDialog />
      </span>
      {categories.length > 0 ? showList() : showEmpty()}
    </div>
  );
}

export default Categories;
