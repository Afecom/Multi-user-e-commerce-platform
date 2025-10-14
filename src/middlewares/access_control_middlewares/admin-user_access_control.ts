import { verify_token } from "../../services/token_sign-verify.js";
import type { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export interface request<P = {}, ResBody = any, ReqBody = any> extends Request<P, ResBody, ReqBody> {
    target_user?: {
        email: string;
        id: string;
        first_name: string;
        last_name: string;
        role: "admin" | "seller" | "customer";
        created_at: Date;
        updated_at: Date;
    }
}

export const admin_user_access = async (req: request<{}, {}, {email: string}>, res: Response<{message: string, error?: unknown}>, next: NextFunction) => {
    const { email } = req.body
    if(!email) return res.status(400).json({message: "Please provide the email of the user you want to fetch in your request body"})
    const auth = req.headers.authorization
    if(!auth) return res.status(400).json({message: "Please provide an auth token inside the header of your request"})
    const token = auth.split(" ")[1]
    if(!token) return res.status(400).json({message: "Please provide an auth token in the authorization field of your request header"})
    try {
        const decoded = verify_token(token, "access")
        const user_id = decoded.user_id
        const user_role = decoded.user_role
        const user = await prisma.users.findUnique({where: {email}})
        if(!user) return res.status(404).json({message: "A user was not found with the provided email"})
        const { password_hash, ...rest_user } = user
        req.target_user = rest_user
        if(user_role === "admin") return next()
        if(user_id !== user.id) return res.status(403).json({message: "Unauthorized to access the resource (i.e: An admin can access all or the user itself can only access his/her own data)"}) 
        return next()
    } catch (error) {
        return res.status(500).json({
            message: "An error occured while trying to perform auth ops",
            error
        })
    }
}