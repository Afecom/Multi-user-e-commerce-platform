import type { Request, Response, NextFunction } from "express";
import { z } from 'zod'

const validate = (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success){
        return res.status(400).json({
            message: result.error.message
        })
    }

    req.body = result.data
    next()
}

export default validate