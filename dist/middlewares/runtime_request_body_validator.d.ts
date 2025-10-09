import type { Request, Response, NextFunction } from "express";
import { z } from 'zod';
declare const validate: (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default validate;
//# sourceMappingURL=runtime_request_body_validator.d.ts.map