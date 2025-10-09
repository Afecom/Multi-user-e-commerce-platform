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
type create_user_request = z.infer<typeof create_user_schema>;
export declare const sign_up: (req: Request<{}, {}, create_user_request>, res: Response) => Promise<void>;
export declare const login: () => void;
export declare const update_user: () => void;
export {};
//# sourceMappingURL=auth.controller.d.ts.map