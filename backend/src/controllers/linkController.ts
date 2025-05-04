import { nanoid } from "nanoid";
import Link from "../models/linkModel";
import Content from "../models/contentModel";

export const generateShareableLink = async (req: any, res: any) => {
  const { share } = req.body;
  const hash = nanoid().slice(0, 8); // or any other unique generator

  try {
    if(!share) {
      await Link.deleteOne({userId : req.userId});
      return res.status(200).json({msg : "Link deleted successfully"});
    }

    const existingLink = await Link.findOne({userId : req.userId})
    console.log(existingLink)
    if(existingLink) return res.status(400).json({msg : "Link already exists", hash : existingLink.hash})
      
    await Link.create({ hash, userId : req.userId});
      return res.status(201).json({ shareableLink: `/l/${hash}` });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to create shareable link" });
  }
};

export const getContentByLink = async (req : any, res : any) => {
  const { hash } = req.params;

  try {
    const link = await Link.findOne({ hash });

    if (!link) return res.status(404).json({ msg: "Invalid or expired link" });

    const userContent = await Content.find({ userId: link.userId }).populate("userId", "username");

    res.status(200).json({ content: userContent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
};
