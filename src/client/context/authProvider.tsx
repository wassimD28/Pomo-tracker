"use client";
import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useAuthStore } from "@/src/client/store/useAuthStore"      
import axios from "axios";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const { setUser, clearUser } = useAuthStore();

  useEffect(() => {
    // Only proceed if Clerk has loaded
    if (!isLoaded) return;

    // If user is not signed in, clear the store
    if (!isSignedIn || !userId) {
      clearUser();
      return;
    }

    // Function to fetch and set user data
    const fetchUserData = async () => {
      try {
        // You'll need to create this endpoint to fetch user data
        const response = await axios.get("/api/users");
        const userData = response.data;
        setUser({
          id: userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          photo: userData.photo,
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        clearUser();
      }
    };

    fetchUserData();
  }, [userId, isLoaded, isSignedIn, setUser, clearUser]);

  return <>{children}</>;
}
