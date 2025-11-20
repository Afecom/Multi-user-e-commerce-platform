import type { Request, Response, NextFunction } from "express";
import { verify_token } from "../../services/token_sign-verify.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

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

export const seller_or_admin = (entity: "categories" | "products") => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = (req.body as {id?: string}).id ?? (req.params as {id?: string}).id
        if(!id) return res.status(400).json({message: "Please provide an id for the resource you want to modify"})
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
                if(entity === "categories"){
                    const category = await prisma.categories.findUnique({where: {id}})
                    if(!category) return res.status(404).json({message: "Category not found"})
                    if(category.seller_profiles_id !== seller_profile.id) return res.status(403).json({message: "Unauthorized to access the resource"})
                }
                else if(entity === "products"){
                    const product = await prisma.products.findUnique({where: {id}})
                    if(!product) return res.status(404).json({message: "Product not found with the provided ID"})
                    if(product.seller_profiles_id !== seller_profile.id) return res.status(403).json({message: "Unauthorized to access the resource"})
                }
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
}