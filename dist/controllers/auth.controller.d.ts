import type { Request, Response } from "express";
import { z } from 'zod';
export declare const create_user_schema: z.ZodObject<{
    first_name: z.ZodString;
    last_name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<{
        customer: "customer";
        admin: "admin";
        seller: "seller";
    }>>;
}, z.core.$strip>;
export declare const get_user_schema: z.ZodObject<{
    email: z.ZodEmail;
}, z.core.$strip>;
export declare const update_user_schema: z.ZodObject<{
    first_name: z.ZodString;
    last_name: z.ZodString;
    email: z.ZodEmail;
    role: z.ZodDefault<z.ZodEnum<{
        customer: "customer";
        admin: "admin";
        seller: "seller";
    }>>;
}, z.core.$strip>;
export declare const login_user_schema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
declare const user_schema: z.ZodObject<{
    id: z.ZodUUID;
    first_name: z.ZodString;
    last_name: z.ZodString;
    email: z.ZodEmail;
    role: z.ZodEnum<{
        customer: "customer";
        admin: "admin";
        seller: "seller";
    }>;
    created_at: z.ZodDate;
    updated_at: z.ZodDate;
}, z.core.$strip>;
type create_user_request = z.infer<typeof create_user_schema>;
type get_user_request = z.infer<typeof get_user_schema>;
type update_user_request = z.infer<typeof update_user_schema>;
type login_user_request = z.infer<typeof login_user_schema>;
type user = z.infer<typeof user_schema>;
type user_login_response = {
    message: string;
    access_token?: string;
    refresh_token?: string;
    error?: unknown;
    user?: user;
};
export declare const sign_up: (req: Request<{}, {}, create_user_request>, res: Response<{
    message: string;
    user?: user;
    error?: unknown;
}>) => Promise<void>;
export declare const login: (req: Request<{}, {}, login_user_request>, res: Response<user_login_response>) => Promise<void>;
export declare const update_user: (req: Request<{}, {}, update_user_request>, res: Response<{
    message: string;
    updated_user?: user;
    error?: unknown;
}>) => Promise<void>;
export declare const get_user: (req: Request<{}, {}, get_user_request>, res: Response<{
    user?: user;
    message: string;
    error?: unknown;
}>) => Promise<Response<{
    user?: user;
    message: string;
    error?: unknown;
}, Record<string, any>> | undefined>;
export declare const get_all_users: (req: Request, res: Response<{
    message: string;
    error?: unknown;
    users?: unknown[];
}>) => Promise<Response>;
export {};
//# sourceMappingURL=auth.controller.d.ts.map