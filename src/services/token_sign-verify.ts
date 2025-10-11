import type { $Enums } from '@prisma/client'
import dotenv from 'dotenv'
dotenv.config()
import jwt from "jsonwebtoken"

interface payload {
    user_id: string,
    user_email: string,
    user_role: $Enums.user_role
}
type tokens = Record<"access_token" | "refresh_token", string>
const jwt_access_secret = process.env.JWT_ACCESS_SECRET as string
const jwt_refresh_secret = process.env.JWT_REFRESH_SECRET as string

export const sign_token = (payload: payload): tokens => {
    const access_token = jwt.sign(payload, jwt_access_secret, {expiresIn: "15m"})
    const refresh_token = jwt.sign(payload, jwt_refresh_secret, {expiresIn: "7d"})
    return {
        access_token, refresh_token
    }
}

export const verify_token = (token: string, type: string) => {
    if(type === "access") return jwt.verify(token, jwt_refresh_secret)
    if (type === "refresh") return jwt.verify(token, jwt_refresh_secret)
    return "Invalid token type"
}