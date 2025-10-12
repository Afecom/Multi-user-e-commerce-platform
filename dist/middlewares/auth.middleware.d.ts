import type { Request, Response, NextFunction } from 'express';
export declare const role_checkpoint: (role: string) => (req: Request, res: Response<{
    message: string;
    error?: unknown;
}>, next: NextFunction) => Promise<Response<{
    message: string;
    error?: unknown;
}, Record<string, any>> | undefined>;
//# sourceMappingURL=auth.middleware.d.ts.map