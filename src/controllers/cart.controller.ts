import type { Request, Response } from "express";
import { string, z } from 'zod'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const cart_request_schema = z.object({
    user_id: z.string(),
    product_id: z.string(),
    quantity: z.int()
})
const get_cart_by_user_id_request_schema = z.object({
    user_id: string()
})
const update_cart_request_schema = z.object({
    id: string(),
    user_id: string()
})
const get_cart_by_id_request_schema = z.object({
    id: z.string()
})

type cart_request = z.infer<typeof cart_request_schema>
type get_cart_by_user_id_request = z.infer<typeof get_cart_by_user_id_request_schema>
type update_cart_request = z.infer<typeof update_cart_request_schema>
type get_cart_by_id_request = z.infer<typeof get_cart_by_id_request_schema>
interface cart {
    user_id: string,
    id: string
    created_at: Date
    updated_at: Date
}

export const create_update_cart = async (req: Request<{}, {}, cart_request>, res: Response): Promise<Response> => {
    const { user_id, product_id, quantity } = cart_request_schema.parse(req.body)
    try {
        const existing_cart = await prisma.carts.findFirst({where: {user_id, status: "active"}})
        if(!existing_cart){
            const cart = await prisma.carts.create({
                data: {user_id}
            })
            const cart_item = await prisma.cart_items.create({
                data: {
                    cart_id: cart.id,
                    product_id,
                    quantity
                },
                include: {cart: true}
            })
            return res.status(201).json({
                message: "Cart created successfully",
                cart: cart_item
            })
        }
        const existing_cart_item = await prisma.cart_items.findUnique({
            where: {
                cart_id_product_id:{
                    cart_id: existing_cart.id,
                    product_id
                }
            }
        })
        if(!existing_cart_item){
            const cart_item = await prisma.cart_items.create({
                data: {
                    cart_id: existing_cart.id,
                    product_id,
                    quantity
                },
                include: {cart: true}
            })
            return res.status(201).json({
                message: "Cart updated successfully",
                cart: cart_item
            })
        }
        const updated_cart_item = await prisma.cart_items.update({
            where: {id: existing_cart_item.id},
            data: {quantity}
        })
        return res.status(201).json({
            message: "Cart updated successfully",
            cart: updated_cart_item
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}
export const get_cart_by_user_id = async (req: Request<{}, {}, get_cart_by_user_id_request>, res: Response<{message: string, error?: unknown, cart?: cart[]}>): Promise<Response> => {
    const { user_id } = get_cart_by_user_id_request_schema.parse(req.body)
    try {
        const cart = await prisma.carts.findMany({
            where: {user_id},
            include: {user: true, cart_items: true}
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
export const get_cart_by_id = async (req: Request<{}, {}, get_cart_by_id_request>, res: Response<{message: string, error?: unknown, cart?: cart}>): Promise<Response> => {
    const { id } = get_cart_by_id_request_schema.parse(req.body)
    try {
        const cart = await prisma.carts.findUnique({
            where: {id},
            include: {user: true, cart_items: true}
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
export const delete_cart = async (req: Request<{}, {}, get_cart_by_id_request>, res: Response<{message: string, error?: unknown}>): Promise<Response> => {
    const { id } = get_cart_by_id_request_schema.parse(req.body)
    try{
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