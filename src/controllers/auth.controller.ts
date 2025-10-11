import type { Request, Response } from "express"
import { $Enums, PrismaClient, user_role } from "@prisma/client"
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

export const get_user_schema = z.object({
    email: z.email()
})

export const update_user_schema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.email(),
    role: z.enum(user_role).default("customer")
})

export const login_user_schema = z.object({
    email: z.email(),
    password: z.string()
})

type create_user_request = z.infer<typeof create_user_schema>
type get_user_request = z.infer<typeof get_user_schema>
type update_user_request = z.infer<typeof update_user_schema>
type login_user_request = z.infer<typeof login_user_schema>
type user = {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    role: $Enums.user_role,
    created_at: Date,
    updated_at: Date
}
type user_login_response = {
    message: string,
    access_token?: string,
    refresh_token?: string,
    error?: unknown,
    user?: user
}

export const sign_up = async (req: Request<{}, {}, create_user_request>, res: Response<{message: string, user?: user, error?: unknown}>) => {
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
            error
        })
    }
}
export const login = async (req: Request<{}, {}, login_user_request>, res: Response<user_login_response>) => {
    const { email, password } = req.body
}
export const update_user = async (req: Request<{}, {}, update_user_request>, res: Response<{message: string, updated_user?: user, error?: unknown}>) => {
    const { first_name, last_name, email, role } = req.body
    try {
        const updated_user = await prisma.users.update({
            where: { email },
            data: { first_name, last_name, role }
        })
        const { password_hash, ...rest_user } = updated_user
        res.status(200).json({
            message: "User updated successfully",
            updated_user: rest_user
        })
    } catch (error) {
        res.status(500).json({
            message: "Couldn't update the user",
            error
        })
    }
}
export const get_user = async (req: Request<{}, {}, get_user_request>, res: Response<{user?: user, message: string, error?: unknown}>) => {
    const { email } = req.body
    try {
        const user = await prisma.users.findUnique({
            where: { email }
        })
        if(!user) return res.status(404).json({message: "User not found"})
        const { password_hash, ...rest_user } = user
        res.status(200).json({
            message: "User found successfully",
            user: rest_user
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to get user",
            error
        })
    }
}

export const get_all_users = async (req: Request, res: Response<{message: string, error?: unknown, users?: user[]}>): Promise<Response> => {
    try {
        let no_pass_users: user[] = []
        const users = await prisma.users.findMany()
        if(!users) return res.status(404).json({ message: "No user was found" })
        users.map((user) => {
            const { password_hash, ...rest_user } = user
            no_pass_users.push(rest_user)
        })
        return res.status(200).json({
            message: "Users fetched successfully",
            users: no_pass_users
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch users",
            error
        })
    }
}