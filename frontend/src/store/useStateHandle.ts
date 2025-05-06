import { create } from "zustand";
import { axiosInstance } from "../config";
import toast from "react-hot-toast";

enum ContentTypes {
    Youtube = "youtube",
    Twitter = "twitter",
    Documents = "documents",
    Links = "links"
}
interface StateType {
    type: ContentTypes;
    content: object[];
    formData: object | null; // ✅ Add this line
    setType: (newType: ContentTypes) => void;
    setFormdata: (data: object) => Promise<void>;
    getContent: () => Promise<void>;
    deleteContent: (id: string) => Promise<void>; // Add this too
}


export const useStateHandle = create<StateType>((set, get) => ({
    type: ContentTypes.Youtube, // Default type
    formData : null,
    content : [],
  
    setType: (newType: ContentTypes) => {
      try {
        const type = get().type;
        if (type !== newType) {
            set({ type: newType });
          }
      } catch (error) {
        console.log(error);
      }
    },

    setFormdata : async (data : object) => {
        const content = get().content;
        for(const post of content) {
            if(post.link === data.link) {
                toast.error("Link already exists");
                return;
            }
        }
        try {
            await axiosInstance.post("/v1/content", data)
            await get().getContent(); // ← fetch the updated content after post
            toast.success("Post created successfully");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    },

    getContent : async () => {
        try {
            const res = await axiosInstance.get("/v1/content");
            set({ content: res.data.posts }); // ✅ Use directly if it's an array
        } catch (error) {
            console.log(error)
            
        }
    },

    deleteContent : async (id : string) => {
        try {
            await axiosInstance.delete(`/v1/content/${id}`)
            await get().getContent(); // ← fetch the updated content after post
            toast.success("Content Deleted");
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong");
        }
    }
}));
  