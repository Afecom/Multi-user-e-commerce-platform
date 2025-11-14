import type { Decimal } from '@prisma/client/runtime/library';
import type { Request, Response } from 'express';
import type { request } from '../middlewares/access_control_middlewares/admin-user_access_control.js';
import { z } from 'zod';
export declare const get_seller_schema: z.ZodObject<{
    email: z.ZodEmail;
}, z.core.$strip>;
type get_seller_request = z.infer<typeof get_seller_schema>;
type seller = {
    id: string;
    created_at: Date;
    updated_at: Date;
    seller_id: string;
    store_name: string;
    description: string;
    rating: Decimal | null;
};
export declare const update_seller: (req: Request, res: Response) => Promise<void>;
export declare const get_seller: (req: request<{}, {}, get_seller_request>, res: Response<{
    message: string;
    seller?: seller;
    error?: unknown;
}>) => Promise<Response>;
export declare const get_sellers: (req: Request, res: Response<{
    message: string;
    sellers?: seller[];
    error?: unknown;
}>) => Promise<Response<{
    message: string;
    sellers?: seller[];
    error?: unknown;
}, Record<string, any>>>;
export declare const delete_seller: (req: request<{}, {}, get_seller_request>, res: Response<{
    message: string;
    error?: unknown;
}>) => Promise<Response<{
    message: string;
    error?: unknown;
}, Record<string, any>>>;
export {};
//# sourceMappingURL=seller.controller.d.ts.map