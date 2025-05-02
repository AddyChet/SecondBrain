import express from "express";
import { generateShareableLink, getContentByLink } from "../controllers/linkController";
import { checkAuthenticatedUser } from "../middlewares/authMiddleware";

const linkRouter = express.Router();

linkRouter.get("/l/:hash", checkAuthenticatedUser, getContentByLink);
linkRouter.post("/l/share", generateShareableLink);

export default linkRouter;