import type { Request, Response } from "express"
import { z } from 'zod'

export const create_user_schema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.email(),
    password: z.string(),
    role: z.string().optional()
})

type create_user_request = z.infer<typeof create_user_schema>

export const sign_up = async (req: Request<{}, {}, create_user_request>, res: Response) => {
    res.send("Hello auth")
}
export const login = () => {}
export const update_user = () => {}