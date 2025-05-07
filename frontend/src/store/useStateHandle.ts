import { create } from "zustand";
import { axiosInstance } from "../utils/config";
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
    filteredContent: object[];
    formData: object | null; // ✅ Add this line
    setType: (newType: ContentTypes) => void;
    setFormdata: (data: object) => Promise<void>;
    getContent: () => Promise<void>;
    resetFilter: () => Promise<void>;
    filterPost : () => Promise<void>;
    deleteContent: (id: string) => Promise<void>; // Add this too
}


export const useStateHandle = create<StateType>((set, get) => ({
    type: ContentTypes.Youtube, // Default type
    formData : null,
    content : [],
    filteredContent : [],
  
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

    setFormdata: async (data: object) => {
        const content = get().content;
        let urlString = data.link;

        console.log(data.link) //https://github.com
        console.log(data.type) // youtube
    
        // Add protocol if missing
        if (!/^https?:\/\//i.test(urlString)) {
            urlString = 'https://' + urlString;
            toast.error("Please enter a valid URL")
            return;
        }
    
        let url;
        try {
            url = new URL(urlString);
        } catch (e) {
            toast.error("Invalid URL");
            return;
        }
    
        const protocol = url.protocol;
        const hostname = url.hostname.toLowerCase();
    
        // Check for HTTPS protocol
        if (protocol !== "https:") {
            toast.error("Only HTTPS URLs are allowed.");
            return;
        }
        // Check for YouTube
        if (data.type === "youtube" && !hostname.includes("youtube.com") && !hostname.includes("youtu.be")) {
            toast.error("Invalid YouTube link. Please provide a valid YouTube URL.");
            return;
        }
    
        // Check for Twitter
        if (data.type === "twitter" && !hostname.includes("twitter.com") && !hostname.includes("x.com") ) {
            toast.error("Invalid Twitter link. Please provide a valid Twitter URL.");
            return;
        }

        if(data.type === "documents") {
            if(hostname.includes("x.com")) {
                toast.error("Invalid Tag Selected. Please Select twitter for tweets");
                return;
            } else if(hostname.includes("youtube.com") || hostname.includes("youtu.be")) {
                toast.error("Invalid Tag Selected. Please Select Youtube for videos");
                return;
            } 
        }

        if(data.type === "links") {
            if(hostname.includes("x.com")) {
                toast.error("Invalid Tag Selected. Please Select twitter for tweets");
                return;
            } else if(hostname.includes("youtube.com") || hostname.includes("youtu.be")) {
                toast.error("Invalid Tag Selected. Please Select Youtube for videos");
                return;
            }
        }
    
        // Check for duplicate link
        for (const post of content) {
            if (post.link === data.link) {
                toast.error("Link already exists");
                return;
            }
        }
    
        try {
            await axiosInstance.post("/v1/content", data);
            await get().getContent(); // fetch the updated content after post
            toast.success("Post created successfully");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    },
    
    getContent : async () => {
        try {
            const res = await axiosInstance.get("/v1/content");
            set({ content: res.data.posts, filteredContent : res.data.posts }); // ✅ Use directly if it's an array
            
            
        } catch (error) {
            console.log(error)
            
        }
    },
    filterPost : (type) => {
        try {
            const newContent = get().content.filter((post) => post.type === type);
            set({ filteredContent: newContent});
        } catch (error) {
            console.log(error)
        }
    },
    resetFilter: () => {
        const content = get().content;
        set({ filteredContent: content });
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
  