import type { Request, Response, NextFunction } from "express";
import { verify_token } from "../../services/token_sign-verify.js";

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