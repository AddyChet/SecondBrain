import { create } from "zustand";
import { axiosInstance } from "../config";
import toast from "react-hot-toast";


export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  signup: async (data, navigate) => {
    set({ isSigningUp: true });
    try {
        await axiosInstance.post("/v1/signup", data);
        toast.success("Account created successfully");
        navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data, navigate) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/v1/login", data);
      set({ authUser: res.data.user });
      toast.success("Logged in successfully");
      navigate("/dashboard");
    } catch (error) {
        console.log(error)
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance("/v1/checkAuth");
      set({ authUser: res.data.user });
    } catch (error) {
      console.log(error)
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  

  logout: async () => {
    try {
      await axiosInstance.post("/v1/logout");
      set({ authUser: null });
    //   toast.success("Logged out successfully");
    } catch (error) {
      console.error("Signup Error:", error);
    //   toast.error(error?.response?.data?.message || "Something went wrong");
    }
  },

  
}))

