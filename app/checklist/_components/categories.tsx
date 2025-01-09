"use client";
import { Category } from "@/app/types/interfaces/common.interface";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import {CreateCategoryDialog } from "./elements/categoryDialog";

interface CategoryResponse {
  status: string;
  data: Category[];
}

function Categories() {
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

  const categories = data?.data || [];

  const showList = () => {
    return (
      <div className="flex h-full w-full flex-col space-y-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group flex w-full cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-white/5"
          >
            <p className="text-gray-400">{category.name}</p>
            <div className="hidden space-x-2 group-hover:flex">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle edit
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:text-red-400"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle delete
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
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
