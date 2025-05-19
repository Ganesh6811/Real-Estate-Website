import { create } from 'zustand';
import axios from "axios";
import baseUrl from "../config.jsx";

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  isLoading: false,
  userId: "",
  name: "",
  email: "",
  phoneNo: "",
  savedPosts:[],

  fetchUser: async () => {
    set({ isLoading: true });
    try {
      const { data } = await axios.get(`${baseUrl}/auth/checkAuth`, {
        withCredentials: true,
      });
      const { _id, name, email, phoneNo, savedPosts } = data;

      set({
        userId: _id,
        name,
        email,
        phoneNo,
        savedPosts,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err) {
    
      console.log("Error in AuthStore:", err);
      set({ isLoading: false, isAuthenticated: false });
    }
  },

  logOut: () => {
    set({
      userId: "",
      name: "",
      email: "",
      phoneNo: "",
      isAuthenticated: false,
      isLoading: false,
    });
  }
}));

export default useAuthStore;
