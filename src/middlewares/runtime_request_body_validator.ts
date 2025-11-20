import type { Request, Response, NextFunction } from "express";
import { z } from 'zod'

type request_part = "body" | "query" | "params"

const validate = (schema: z.ZodType, source: request_part = "body") => (req: Request, res: Response, next: NextFunction) => {
    const target = source === "body" ? req.body : source === "query" ? req.query : req.params
    const result = schema.safeParse(target)
    if (!result.success){
        return res.status(400).json({
            message: result.error.message
        })
    }

    if(source === "body") req.body = result.data as typeof req.body
    if(source === "query") req.query = result.data as typeof req.query
    if(source === "params") req.params = result.data as typeof req.params
    next()
}

export default validate