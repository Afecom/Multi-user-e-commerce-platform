import dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken";
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
    if (type === "access")
        return jwt.verify(token, jwt_refresh_secret);
    if (type === "refresh")
        return jwt.verify(token, jwt_refresh_secret);
    return "Invalid token type";
};
//# sourceMappingURL=token_sign-verify.js.map