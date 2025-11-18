import type { Request, Response } from "express";
import { string, z } from 'zod'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const cart_request_schema = z.object({
    user_id: z.string()
})
const get_cart_request_schema = z.object({
    id: string()
})

const update_cart_request_schema = z.object({
    id: string(),
    user_id: string()
})

type cart_request = z.infer<typeof cart_request_schema>
type get_cart_request = z.infer<typeof get_cart_request_schema>
type update_cart_request = z.infer<typeof update_cart_request_schema>
interface cart {
    user_id: string
    id: string
    created_at: Date
    updated_at: Date

}

export const create_cart = async (req: Request<{}, {}, cart_request>, res: Response<{message: string, error?: unknown, cart?: unknown}>): Promise<Response> => {
    const { user_id } = cart_request_schema.parse(req.body)
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
export const get_cart_by_id = async (req: Request<{}, {}, get_cart_request>, res: Response<{message: string, error?: unknown, cart?: cart}>): Promise<Response> => {
    const { id } = get_cart_request_schema.parse(req.body)
    try {
        const cart = await prisma.carts.findUnique({
            where: {id},
            include: {user: true}
        })
        if(!cart) return res.status(404).json({message: "Cart not found with the provided ID"})
        return res.status(200).json({
            message: "Cart found successfully",
            cart
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}
export const get_cart_by_user_id = async (req: Request<{}, {}, cart_request>, res: Response<{message: string, error?: unknown, cart?: cart[]}>): Promise<Response> => {
    const { user_id } = cart_request_schema.parse(req.body)
    try {
        const cart = await prisma.carts.findMany({
            where: {user_id},
            include: {user: true}
        })
        if(!cart) return res.status(404).json({message: "Cart not found for the user provided"})
        return res.status(200).json({
            message: "Cart found successfully",
            cart
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}
export const update_cart = async (req: Request<{}, {}, update_cart_request>, res: Response<{message: string, error?: unknown, cart?: cart}>): Promise<Response> => {
    const { id, user_id } = update_cart_request_schema.parse(req.body)
    try {
        const updated_cart = await prisma.carts.update({
            where: {id},
            data: {user_id}
        })
        return res.status(200).json({
            message: "Cart updated successfully",
            cart: updated_cart
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}
export const delete_cart = async (req: Request<{}, {}, get_cart_request>, res: Response<{message: string, error?: unknown}>): Promise<Response> => {
    const { id } = get_cart_request_schema.parse(req.body)
    try {
        await prisma.carts.delete({where: {id}})
        return res.status(203).json({
            message: "Cart deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}