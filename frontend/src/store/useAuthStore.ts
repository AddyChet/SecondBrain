import { create } from "zustand";
import { axiosInstance } from "../utils/config";
import toast from "react-hot-toast";

interface UserAuthInterface {
  authUser: object | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
}
export const useAuthStore = create<UserAuthInterface>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  signup: async (
    data: object,
    navigate: (path: string) => void
  ): Promise<void> => {
    set({ isSigningUp: true });
    try {
      await axiosInstance.post("/v1/signup", data);
      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error("Something went wrong");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (
    data: object,
    navigate: (path: string) => void
  ): Promise<void> => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/v1/login", data);
      set({ authUser: res.data.user });
      toast.success("Logged in successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  checkAuth : async () => {
    try {
      const res = await axiosInstance.get("/v1/checkAuth", { withCredentials: true });
      if (res.data.user) {
        // Set user if authenticated
        set({ authUser: res.data.user, isCheckingAuth: false });
      } else {
        // No authenticated user (e.g., user is not logged in)
        set({ authUser: null, isCheckingAuth: false });
      }
    } catch (error) {

      set({ authUser: null, isCheckingAuth: false });
    }
  },
  
  logout: async () => {
    try {
      await axiosInstance.get("/v1/logout", { withCredentials: true });
      set({ authUser: null, isCheckingAuth: false });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error("Something went wrong");
      set({ authUser: null, isCheckingAuth: false });
    }
  },
}));
