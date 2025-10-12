import dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken";
import { string } from 'zod';
const jwt_access_secret = process.env.JWT_ACCESS_SECRET;
const jwt_refresh_secret = process.env.JWT_REFRESH_SECRET;
export const sign_token = (payload) => {
    const access_token = jwt.sign(payload, jwt_access_secret, { expiresIn: "15m" });
    const refresh_token = jwt.sign(payload, jwt_refresh_secret, { expiresIn: "7d" });
    return {
        access_token, refresh_token
    };
};
export const verify_token = (token, type) => {
    try {
        const secret = type === "access" ? jwt_access_secret : jwt_refresh_secret;
        const decoded = jwt.verify(token, secret);
        if (!decoded || typeof decoded === "string")
            throw new Error("Invalid signiture or token");
        return decoded;
    }
    catch (error) {
        throw error;
    }
};
//# sourceMappingURL=token_sign-verify.js.map