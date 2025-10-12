import type { $Enums } from '@prisma/client';
interface payload {
    user_id: string;
    user_email: string;
    user_role: $Enums.user_role;
}
type tokens = Record<"access_token" | "refresh_token", string>;
export declare const sign_token: (payload: payload) => tokens;
export declare const verify_token: (token: string, type: "access" | "refresh") => payload;
export {};
//# sourceMappingURL=token_sign-verify.d.ts.map