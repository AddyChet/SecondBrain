import express from "express";
import { postContent, getContent, deleteContent } from "../controllers/contentController";
import { checkAuthenticatedUser } from "../middlewares/authMiddleware";
const contentRouter = express.Router();

//create Content
contentRouter.post("/content", checkAuthenticatedUser, postContent);
//getContent
contentRouter.get("/content", checkAuthenticatedUser, getContent);
//delete content
contentRouter.delete("/content/:id", checkAuthenticatedUser, deleteContent);
export default contentRouter;
