import type { Request, Response } from "express";
import { z } from 'zod'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const create_cart_schema = z.object({
    user_id: z.string()
})

type create_cart_request = z.infer<typeof create_cart_schema>
interface cart {
    user_id: string
    id: string
    created_at: Date
    updated_at: Date

}

export const create_cart = async (req: Request<{}, {}, create_cart_request>, res: Response<{message: string, error?: unknown, cart?: unknown}>) => {
    const { user_id } = create_cart_schema.parse(req.body)
    try {
        const cart = await prisma.carts.create({
            data: {user_id}
        })
        return res.status(201).json({
            message: "Cart created successfully",
            cart
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}
export const get_cart = async (req: Request, res: Response<{message: string, error?: unknown}>) => {}
export const update_cart = async (req: Request, res: Response<{message: string, error?: unknown}>) => {}
export const delete_cart = async (req: Request, res: Response<{message: string, error?: unknown}>) => {}