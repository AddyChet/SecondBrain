import express from "express";
import {
  userSignup,
  userLogin,
  userLogout,
} from "../controllers/userController";
import { checkAuthenticatedUser } from "../middlewares/authMiddleware";

const userRouter = express.Router();
//signup
userRouter.post("/signup", userSignup);
//signing
userRouter.post("/login", userLogin);
//logout
userRouter.get("/logout", checkAuthenticatedUser, userLogout);

export default userRouter