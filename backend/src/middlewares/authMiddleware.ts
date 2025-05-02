import jwt, { JwtPayload } from "jsonwebtoken"
import { Request, Response } from "express";

export const checkAuthenticatedUser = async (req : any, res : any, next: any) => {
    try {
        const {token} = req.cookies;
        if(!token) return res.status(411).json({msg : "Unauthorized Access"})
        
        if(!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in the environment variables");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (typeof decoded === "string") {
            return res.status(403).json({ msg: "Invalid Token Format." });
        }

        req.userId = (decoded as JwtPayload).userId;
        next();
        
    } catch (error) {
        return res.status(403).json({ msg: "Invalid Token." });
    }
}