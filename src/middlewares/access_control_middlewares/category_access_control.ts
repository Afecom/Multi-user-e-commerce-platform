import type { Request, Response, NextFunction } from "express";
import { verify_token } from "../../services/token_sign-verify.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export interface category_req<P = {}, ResBody = any, ReqBody = any> extends Request<P, ResBody, ReqBody> {
    categories?: {
        id: string,
        name: string,
        description: string | null,
        seller_profiles_id: string | null,
        created_at: Date;
        updated_at: Date;
    }[]
}

export const seller_admin_access = async (req: Request, res: Response<{message: string, error?: unknown}>, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]
    if(!token) return res.status(400).json({message: "Please provide an access token inside the authorization field of your request header"})
    try {
        const decoded = verify_token(token, "access")
        const user_role = decoded.user_role
        if (user_role === "admin" || user_role === "seller") return next()
        return res.status(403).json({
            message: "Unauthorized to access the resource"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}

export const seller_or_admin = async (req: category_req, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]
    if(!token) return res.status(400).json({message: "Please provide an access token inside the authorization field of your request"})
    try {
        const decoded = verify_token(token, "access")
        const user_id = decoded.user_id
        const user_role = decoded.user_role
        if(user_role === "admin") return next()
        if(user_role === "seller"){
            const seller_profile = await prisma.seller_profiles.findUnique({
                where: {
                    seller_id: user_id
                }
            })
            if(!seller_profile) return res.status(404).json({message: "A seller profile is not found for the provided user"})
            const categories = await prisma.categories.findMany({where: {seller_profiles_id: seller_profile.id}})
            if(!categories) return res.status(404).json({message: "Couldn't find a category associated with the provided seller"})
            req.categories = categories
            return next()
        }
        return res.status(403).json({
            message: "Unauthorized to access the resources"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}