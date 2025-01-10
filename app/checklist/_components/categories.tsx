"use client";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { CreateCategoryDialog } from "./elements/categoryDialog";
import CategoryCard from "./elements/categoryCard";
import { Category } from "@/app/types/interfaces/common.interface";
import { useState } from "react";

interface CategoryResponse {
  status: string;
  data: Category[];
}

function Categories() {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>();
  // Fetching categories
  const { data, isLoading, isError } = useQuery<CategoryResponse>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get("/api/categories");
      return response.data;
    },
    refetchInterval: 60000, // Fetch categories every minute
    staleTime: 1000 * 60 * 5, // Cache categories for 5 minutes
  });

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
  };

  const categories = data?.data || [];
  const showList = () => {
    return (
      <div className="flex h-full w-full flex-col space-y-2">
        {categories.map((category) => (
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
