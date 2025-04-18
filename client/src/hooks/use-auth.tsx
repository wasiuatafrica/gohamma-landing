import { createContext, ReactNode, useContext } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { User, insertUserSchema } from "@shared/schema"; // Removed non-existent userSchema import
import { getQueryFn, apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// Define types for API responses based on user feedback
type LoginResponse = {
  refresh: string;
  access: string;
  user: User; // Assuming the user object matches the shared User schema
};

type RegisterResponse = {
  detail: string;
  user: User; // Assuming the user object matches the shared User schema
};


type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  // Update mutation result types if needed, though react-query handles this internally
  loginMutation: UseMutationResult<LoginResponse, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<RegisterResponse, Error, InsertUser>;
};

// Adding validation rules to the schema
// Adjust to match backend expectations (lowercase firstname/lastname, remove username)
export const userSignupSchema = z.object({ // Use z.object directly instead of extending insertUserSchema
  firstname: z.string().min(2, "First name must be at least 2 characters"), // Use lowercase
  lastname: z.string().min(2, "Last name must be at least 2 characters"), // Use lowercase
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  // username: z.string().min(3, "Username must be at least 3 characters"), // Remove username
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

// Create a login schema that requires email and password
export const userLoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Update LoginData type to reflect the change from username to email
type LoginData = z.infer<typeof userLoginSchema>;
type InsertUser = z.infer<typeof insertUserSchema>;

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User | null, Error>({
    // Use the new absolute URL for fetching user profile
    queryKey: ['https://api-hamma-f0bcaabf77ea.herokuapp.com/auth/profile/'],
    // getQueryFn uses the queryKey[0] as the URL, so no need to pass url in options
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      // Use the new absolute URL for login
      const res = await apiRequest("POST", "https://api-hamma-f0bcaabf77ea.herokuapp.com/auth/login/", credentials);
      // Expect LoginResponse structure
      return (await res.json()) as LoginResponse; 
    },
    onSuccess: (responseData: LoginResponse) => {
      // Store tokens in localStorage
      localStorage.setItem("accessToken", responseData.access);
      localStorage.setItem("refreshToken", responseData.refresh);
      // Update the cache with the user object from the response
      queryClient.setQueryData(['https://api-hamma-f0bcaabf77ea.herokuapp.com/auth/profile/'], responseData.user);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (credentials: InsertUser) => {
      // Use the new absolute URL for registration
      const res = await apiRequest("POST", "https://api-hamma-f0bcaabf77ea.herokuapp.com/auth/register/", credentials);
      // Expect RegisterResponse structure
      return (await res.json()) as RegisterResponse; 
    },
    onSuccess: (responseData: RegisterResponse) => {
      // DO NOT log the user in automatically (queryClient.setQueryData)
      // Show the detail message from the backend (e.g., "check your email")
      toast({
        title: "Registration Submitted",
        description: responseData.detail || "Please check your email to verify your account.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      // Use the assumed new absolute URL for logout - VERIFY THIS ENDPOINT
      // Use the assumed new absolute URL for logout - VERIFY THIS ENDPOINT
      await apiRequest("POST", "https://api-hamma-f0bcaabf77ea.herokuapp.com/auth/logout/"); 
    },
    onSuccess: () => {
      // Remove tokens from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      // Clear user data from cache
      queryClient.setQueryData(['https://api-hamma-f0bcaabf77ea.herokuapp.com/auth/profile/'], null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        registerMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
