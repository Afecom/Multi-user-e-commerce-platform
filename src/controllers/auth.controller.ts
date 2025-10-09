import type { Request, Response } from "express"
import { PrismaClient, user_role } from "@prisma/client"
import { z } from 'zod'
import { hash_password } from "../utils/password_hasher.js"

const prisma = new PrismaClient()

export const create_user_schema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.email(),
    password: z.string(),
    role: z.enum(user_role).default("customer")
})

type create_user_request = z.infer<typeof create_user_schema>

export const sign_up = async (req: Request<{}, {}, create_user_request>, res: Response) => {
    const { first_name, last_name, email, password, role} = req.body
    try {
        const hashed_password = await hash_password(password)
        const user = await prisma.users.create({data: {first_name, last_name, email, password_hash: hashed_password, role}})
        const { password_hash, ...rest_user } = user
        res.status(201).json({
            message: "User created successfully",
            user: rest_user
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to create user",
        })
    }
}
export const login = () => {}
export const update_user = () => {}