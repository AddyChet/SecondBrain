import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";

export const checkAuthenticatedUser = async (req: any, res: any, next: any) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      req.userId = null;
      return next(); // Let the route handler respond with user: null
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof decoded === "string") {
      return res.status(403).json({ msg: "Invalid Token Format." });
    }

    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (error) {
    return res.status(403).json({ msg: "Invalid Token." });
  }
};
