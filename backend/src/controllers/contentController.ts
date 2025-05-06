import Content from "../models/contentModel";
import {z} from "zod"
import { Request, Response } from "express";

export const postContent = async (req: any, res: any): Promise<Response> => {
  const { title, link, type, tags} = req.body;
  try {
    const contentSchema = z.object({
      title: z
        .string()
        .min(3, { message: "Title must be at least 3 characters long" }),
      link: z.string().url({ message: "Invalid URL format" }),
      type: z.string().optional(),
      tags: z.array(z.string()).optional(),
      userId : z.string()
    });

    const result = contentSchema.safeParse({ title, link, type, tags, userId : req.userId });

    if (!result.success) {
      return res.status(411).json({
        msg: "Invalid Data",
        errors: result.error.errors,
      });
    }

    //post the content inside the DB
    const postContent = await Content.create({title, link, type, tags, userId : req.userId})

    if(!postContent) return res.status(400).json({msg : "Error occurred in creating post"})

    return res.status(201).json({msg : "Post Created", posts : postContent})

  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getContent = async (req: any, res: any): Promise<Response> => {
  try {
    const userId = req.userId
    const getContent = await Content.find({userId : userId}).populate("userId", "username")
    if(!getContent) return res.status(400).json({msg : "Error occurred in fetching posts"})
    return res.status(200).json({msg : "Posts Fetched", posts : getContent})
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};




export const deleteContent = async (req: Request, res: Response): Promise<Response> => {
    const {id} = req.params;
    try {
        const idSchema = z.object({
            id: z.string().min(1, { message: "ID must not be empty" }),
        });

        const validationResult = idSchema.safeParse({ id});

        if (!validationResult.success) {
            return res.status(400).json({ error: validationResult.error.errors });
        }

        const deletedContent = await Content.findByIdAndDelete(id);
        
        if (!deletedContent) {
            return res.status(404).json({ msg: "Content not found" });
        }

        return res.status(200).json({ msg: "Content deleted successfully" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}