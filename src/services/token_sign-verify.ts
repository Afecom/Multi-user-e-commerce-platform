import type { $Enums } from '@prisma/client'
import dotenv from 'dotenv'
dotenv.config()
import jwt from "jsonwebtoken"
import { string } from 'zod'

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

export const verify_token = (token: string, type: "access" | "refresh"): payload => {
    try {
        const secret = type === "access"? jwt_access_secret : jwt_refresh_secret
        const decoded = jwt.verify(token, secret)
        if(!decoded || typeof decoded === "string") throw new Error("Invalid signiture or token")
        return decoded as payload
    } catch (error) {
        throw error
    }
}