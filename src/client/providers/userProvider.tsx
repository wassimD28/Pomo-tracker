"use client";
import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINTS } from "@/src/shared/constant/endpoints";

// Define the shape of the context
interface UserContextType {
  user: User | null; // User data or null if not logged in
  isLoading: boolean; // Loading state
  isError: boolean; // Error state
  error: Error | null; // Error details
}

// Default context value
const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
  isError: false,
  error: null,
});

// Define the User type (adjust based on your backend response)
export interface User {
  id: number;
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create the provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Use React Query to fetch user data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get(API_ENDPOINTS.USERS.BASE);
      return response.data.data as User; // Adjust based on your API response
    },
    retry: 1, // Retry once if the request fails
  });

  // Prepare the context value
  const contextValue: UserContextType = {
    user: data || null,
    isLoading,
    isError,
    error: error instanceof Error ? error : null,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

// Custom hook to access the user context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
