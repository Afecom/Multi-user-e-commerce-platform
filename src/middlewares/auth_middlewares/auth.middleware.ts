import { verify_token } from "../../services/token_sign-verify.js";
import type { Request, Response, NextFunction } from 'express'

export const role_checkpoint = (role: string) => {
    return async (req: Request, res: Response<{message: string, error?: unknown}>, next: NextFunction) => {
        const auth = req.headers.authorization
        if(!auth) return res.status(400).json({message: "Please provide an auth token in the header of your request"})
        const token = auth.split(" ")[1]
        if(!token) return res.status(400).json({message: "Please provide a proper auth token"})
        try {
            const decoded = verify_token(token, "access")
            const user_role = decoded.user_role
            if(user_role !== role) return res.status(403).json({message: "Unauthorized to access the resource"})
            next()
        } catch (error) {
            res.status(500).json({
                message: "An error occured while trying to perform an auth ops",
                error
            })
        }
    }
}