import type { Request, Response, NextFunction } from "express";
export interface request<P = {}, ResBody = any, ReqBody = any> extends Request<P, ResBody, ReqBody> {
    target_user?: {
        email: string;
        id: string;
        first_name: string;
        last_name: string;
        role: "admin" | "seller" | "customer";
        created_at: Date;
        updated_at: Date;
    };
}
export declare const admin_user_access: (req: request<{}, {}, {
    email: string;
}>, res: Response<{
    message: string;
    error?: unknown;
}>, next: NextFunction) => Promise<void | Response<{
    message: string;
    error?: unknown;
}, Record<string, any>>>;
//# sourceMappingURL=admin-user_access_control.d.ts.map