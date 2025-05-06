import User from "../models/userModel";
import {z} from "zod"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { Request, Response } from "express";

// Define or import the AuthenticatedRequest type
interface AuthenticatedRequest extends Request {
  userId?: string; // Add the expected properties
}

export const userSignup = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  try {
    const userCheckSchema = z.object({
      username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters long" })
        .max(15, { message: "Username must be at most 10 characters long" }),

      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(20, { message: "Password must be at most 20 characters long" })
        .regex(/[A-Z]/, {
          message: "Password must contain at least one uppercase letter",
        })
        .regex(/[a-z]/, {
          message: "Password must contain at least one lowercase letter",
        })
        .regex(/\d/, { message: "Password must contain at least one number" })
        .regex(/[@$!%*?&]/, {
          message: "Password must contain at least one special character",
        }),
    });

    const result = userCheckSchema.safeParse({
      username,
      password,
    });
    if (!result.success) {
      return res.status(411).json({
        msg: "Invalid Credentials",
        errors: result.error.errors,
      });
    }

    //check for existing user
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(403).json({ msg: "Username already exists" });

    //create hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create a mew user
    const newUser = await User.create({ username, password: hashedPassword });
    if (!newUser) return res.status(400).json({ msg: "Error Creating User" });

    return res.status(201).json({ msg: "Signed Up Successfully" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const userLogin = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;

  // Zod validation schema
  const userCheckSchema = z.object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" })
      .max(20, { message: "Username must be at most 20 characters long" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(20, { message: "Password must be at most 20 characters long" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/\d/, { message: "Password must contain at least one number" })
      .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character" }),
  });

  // Validate request data
  const result = userCheckSchema.safeParse({ username, password });
  if (!result.success) {
    return res.status(411).json({
      msg: "Invalid Credentials",
      errors: result.error.errors,
    });
  }

  try {
    // Check user existence
    const user = await User.findOne({ username });
    if (!user) return res.status(411).json({ msg: "Invalid Credentials" });

    // Check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(411).json({ msg: "Invalid Credentials" });

    // Generate token
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Remove password from user object before sending
    const { password: pwd, ...userWithoutPassword } = user.toObject();

    // Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60, // 1 hour
    });

    // Return success response
    return res.status(200).json({
      msg: "Logged in successfully",
      user: userWithoutPassword,
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};



export const userLogout = async (req: Request, res: Response): Promise<Response> => {
  try {
    res.clearCookie("token");
    return res.status(200).json({msg : "Logged out successful"})
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}



export const checkAuth = async (req: AuthenticatedRequest, res: Response): Promise<Response> => { 
  try {
    if (!req.userId) {
      // If userId is not present, return unauthenticated
      return res.status(401).json({ user : null });
    }

    const user = await User.findOne({_id : req.userId})
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const { password: pwd, ...userWithoutPassword } = user.toObject();
  
    return res.status(200).json({user: userWithoutPassword});
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}