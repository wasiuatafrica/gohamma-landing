import { useToast } from "@/hooks/use-toast";
import { insertUserSchema, User } from "@shared/schema"; // Removed non-existent userSchema import
import {
  useMutation,
  UseMutationResult,
  useQuery,
} from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useEffect, useState } from "react"; // Added useState, useEffect
import { z } from "zod";
import { apiRequest, getQueryFn, queryClient } from "../lib/queryClient";

// Define types for API responses based on user feedback
// Removed duplicate LoginResponse definition here

type RegisterResponse = {
  detail: string;
  user: User; // Assuming the user object matches the shared User schema
};


type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  isAwaiting2FA: boolean; // State to indicate if OTP input is needed
  emailFor2FA: string | null; // Store email temporarily for 2FA verification/resend
  clear2FAState: () => void; // Function to reset 2FA state
  loginMutation: UseMutationResult<LoginResponse, Error, LoginData>;
  verify2FAMutation: UseMutationResult<LoginResponse, Error, Verify2FAData>; // Added 2FA verification mutation
  resend2FATokenMutation: UseMutationResult<void, Error, void>; // Added 2FA resend mutation
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<RegisterResponse, Error, InsertUser>;
};

// --- Device Info Types (Similar to go-hamma) ---
type DeviceInfo = {
  device: string | null;
  location: string; // Renamed from location
  ip_address: string | null;
  device_type: 'Mobile' | 'Tablet' | 'Desktop';
};

// --- 2FA Types ---
type Verify2FAData = {
  token: string;
  // email is retrieved from emailFor2FA state
};

// --- Login Response Type Update ---
// Add optional 'detail' field to handle 2FA message
type LoginResponse = {
  refresh: string;
  access: string;
  user?: User; // User might not be present in initial login response
  detail?: string; // e.g., "Please check your mail for your 2fa token"
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
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    device: null,
    location: '', // Renamed from location
    ip_address: null,
    device_type: 'Desktop', // Default or calculate later
  });
  const [isAwaiting2FA, setIsAwaiting2FA] = useState(false);
  const [emailFor2FA, setEmailFor2FA] = useState<string | null>(null);

  // --- Effect to gather Device Info ---
  useEffect(() => {
    // Get Device Type
    const getDeviceType = (): DeviceInfo['device_type'] => {
      if (window.innerWidth <= 768) return 'Mobile';
      if (window.innerWidth <= 1024) return 'Tablet';
      return 'Desktop';
    };

    // Get Geolocation
    let geoLocation = ''; // Renamed from location
    // Commented out geolocation request to prevent location permission prompt
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       geoLocation = `${position.coords.latitude}, ${position.coords.longitude}`; // Renamed
    //       setDeviceInfo(prev => ({ ...prev, location:geoLocation })); // Renamed
    //     },
    //     (error) => {
    //       console.error("Geolocation error:", error);
    //       // Handle error or set default location if needed
    //     }
    //   );
    // }

    // Get IP Address (using external service like go-hamma)
    let ip_address: string | null = null;
    const fetchIp = async () => {
      try {
        const res = await fetch("https://api.ipify.org/?format=json");
        if (res.ok) {
          const data = await res.json();
          ip_address = data.ip;
          setDeviceInfo(prev => ({ ...prev, ip_address }));
        }
      } catch (error) {
        console.error("Failed to fetch IP address:", error);
      }
    };

    fetchIp();

    // Set initial device info
    setDeviceInfo({
      device: navigator.userAgent,
      location:geoLocation, // Renamed, will be updated by async geolocation
      ip_address, // Will be updated by async fetchIp
      device_type: getDeviceType(),
    });

    // Update device type on resize
    const handleResize = () => {
      setDeviceInfo(prev => ({ ...prev, device_type: getDeviceType() }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []);

  // Function to clear 2FA state (e.g., when modal is closed)
  const clear2FAState = () => {
    setIsAwaiting2FA(false);
    setEmailFor2FA(null);
  };

  // --- SSO Check / Fetch User Profile ---
  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User | null, Error>({
    // Use the new absolute URL for fetching user profile
    queryKey: ['https://api-hamma-f0bcaabf77ea.herokuapp.com/auth/profile/'],
    queryFn: getQueryFn({ on401: "returnNull" }),
    retry: false, // Don't retry profile fetching on initial load failure
    refetchOnWindowFocus: false, // Avoid refetching profile just on window focus
  });

  // --- Login Mutation ---
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const payload = {
        ...credentials,
        ...deviceInfo, // Add device info to the payload
      };
      const res = await apiRequest("POST", "https://api-hamma-f0bcaabf77ea.herokuapp.com/auth/login/", payload);
      return (await res.json()) as LoginResponse;
    },
    onSuccess: (responseData: LoginResponse, variables) => {
      // Check if 2FA is required
      if (responseData.detail === "Please check your mail for your 2fa token") {
        setEmailFor2FA(variables.email); // Store email for 2FA step
        setIsAwaiting2FA(true); // Set state to show OTP input
        toast({
          title: "2FA Required",
          description: "Please check your email for your OTP.",
        });
      } else {
        // Login successful, 2FA not required or already passed
        localStorage.setItem("access_token", responseData.access);
        localStorage.setItem("refresh_token", responseData.refresh);
        setIsAwaiting2FA(false); // Ensure 2FA state is reset
        setEmailFor2FA(null);

        // If user data is in response, update cache directly
        if (responseData.user) {
          queryClient.setQueryData(['https://api-hamma-f0bcaabf77ea.herokuapp.com/auth/profile/'], responseData.user);
        } else {
          // If user data is not in response, invalidate and refetch profile
          queryClient.invalidateQueries({ queryKey: ['https://api-hamma-f0bcaabf77ea.herokuapp.com/auth/profile/'] });
        }
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
      }
    },
    onError: (error: Error) => {
      setIsAwaiting2FA(false); // Reset 2FA state on error
      setEmailFor2FA(null);
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials or server error.",
        variant: "destructive",
      });
    },
  });

  // --- 2FA Verification Mutation ---
  const verify2FAMutation = useMutation({
    mutationFn: async (data: Verify2FAData) => {
      if (!emailFor2FA) {
        throw new Error("Email for 2FA not found. Please try logging in again.");
      }
      const payload = {
        email: emailFor2FA,
        token: data.token,
        ...deviceInfo, // Add device info
      };
      const res = await apiRequest("POST", "https://api-hamma-f0bcaabf77ea.herokuapp.com/auth/login-with-2fa/", payload);
      return (await res.json()) as LoginResponse; // Expects { access, refresh, user? }
    },
    onSuccess: (responseData: LoginResponse) => {
      localStorage.setItem("access_token", responseData.access);
      localStorage.setItem("refresh_token", responseData.refresh);
      setIsAwaiting2FA(false); // Reset 2FA state
      setEmailFor2FA(null);

      if (responseData.user) {
        queryClient.setQueryData(['https://api-hamma-f0bcaabf77ea.herokuapp.com/auth/profile/'], responseData.user);
      } else {
        queryClient.invalidateQueries({ queryKey: ['https://api-hamma-f0bcaabf77ea.herokuapp.com/auth/profile/'] });
      }
      toast({
        title: "Verification Successful",
        description: "You are now logged in.",
      });
    },
    onError: (error: Error) => {
      // Keep isAwaiting2FA true so user can retry OTP
      toast({
        title: "2FA Verification Failed",
        description: error.message || "Invalid OTP or server error.",
        variant: "destructive",
      });
    },
  });

  // --- Resend 2FA Token Mutation ---
  const resend2FATokenMutation = useMutation({
    mutationFn: async () => {
      if (!emailFor2FA) {
        throw new Error("Email for 2FA not found. Cannot resend token.");
      }
      // Backend uses PUT /auth/register/ for resend
      await apiRequest("PUT", "https://api-hamma-f0bcaabf77ea.herokuapp.com/auth/register/", { email: emailFor2FA });
    },
    onSuccess: () => {
      toast({
        title: "OTP Resent",
        description: "Please check your email for the new OTP.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to Resend OTP",
        description: error.message || "Could not resend OTP.",
        variant: "destructive",
      });
    },
  });


  // --- Registration Mutation (Existing - No changes needed for core logic) ---
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
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Removed duplicate registerMutation block here

  // --- Logout Mutation ---
  const logoutMutation = useMutation({
    mutationFn: async () => {
      // Call the backend logout endpoint
      try {
        // Use the correct absolute URL
        await apiRequest("POST", "https://api-hamma-f0bcaabf77ea.herokuapp.com/auth/logout/");
      } catch (error) {
        // Log error but proceed with client-side cleanup even if backend call fails
        console.error("Backend logout failed:", error);
        // Optionally inform the user, but prioritize cleanup
        // toast({ title: "Logout Info", description: "Could not reach logout endpoint, clearing local session." });
      }
    },
    onSuccess: () => {
      // Always clean up client-side regardless of backend response
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_email"); // Also clear email if stored
      queryClient.setQueryData(['https://api-hamma-f0bcaabf77ea.herokuapp.com/auth/profile/'], null);
      setIsAwaiting2FA(false); // Reset 2FA state on logout
      setEmailFor2FA(null);
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
        isAwaiting2FA,
        emailFor2FA,
        clear2FAState,
        loginMutation,
        verify2FAMutation, // Add new mutation
        resend2FATokenMutation, // Add new mutation
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
