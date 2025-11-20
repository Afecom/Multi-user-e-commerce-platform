import type { Request, Response } from "express";
import { string, z } from 'zod'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const create_cart_item_request_schema = z.object({
    cart_id: z.string(),
    product_id: string(),
    quantity: z.int()
})
export const get_cart_item_request_schema = z.object({
    id: z.string()
})
export const update_cart_item_request_schema = z.object({
    cart_id: z.string().optional(),
    product_id: z.string().optional(),
    quantity: z.int().optional()
})

type create_cart_item_request = z.infer<typeof create_cart_item_request_schema>
type get_cart_item_request = z.infer<typeof get_cart_item_request_schema>
type update_cart_item_request = z.infer<typeof update_cart_item_request_schema>
interface cart_item {
    id: string,
    cart_id: string,
    product_id: string,
    quantity: number,
    created_at: Date,
    updated_at: Date
}

export const create_cart_item = async (req: Request<{}, {}, create_cart_item_request>, res: Response<{message: string, error?: unknown, cart_item?: cart_item}>): Promise<Response> => {
    const { cart_id, product_id, quantity } = create_cart_item_request_schema.parse(req.body)
    try {
        const cart_item = await prisma.cart_items.create({
            data: {
                cart_id, 
                product_id, 
                quantity
            }
        })
        return res.status(201).json({
            message: "Cart item created successfully",
            cart_item
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}
export const get_cart_item_by_id = async (req: Request<{id: string}>, res: Response<{message: string, error?: unknown, cart_item?: cart_item}>): Promise<Response> => {
    const { id } = get_cart_item_request_schema.parse(req.params)
    try {
        const cart_item = await prisma.cart_items.findUnique({where: {id}})
        if(!cart_item) return res.status(404).json({message: "A cart item was not found with the provided ID"})
        return res.status(200).json({
            message: "Cart item found successfully",
            cart_item
        })
    } catch (error) {
       return res.status(500).json({
        message: "Internal server error",
        error
       }) 
    }
}
export const update_cart_item = async (req: Request<{id: string}, {}, update_cart_item_request>, res: Response<{message: string, error?: unknown, cart_item?: cart_item}>): Promise<Response> => {
    const { id } = get_cart_item_request_schema.parse(req.params)
    const { cart_id, product_id, quantity } = update_cart_item_request_schema.parse(req.body)
    try {
        const updated_cart_item = await prisma.cart_items.update({
            where: {id},
            data: {
                ...(cart_id !== undefined && {cart_id}),
                ...(product_id !== undefined && {product_id}),
                ...(quantity !== undefined && {quantity})
            }
        })
        return res.status(200).json({
            message: "Cart item updated successfully",
            cart_item: updated_cart_item
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}
export const delete_cart_item = async (req: Request<{id: string}>, res: Response<{message: string, error?: unknown}>): Promise<Response> => {
    const { id } = get_cart_item_request_schema.parse(req.params)
    try {
        await prisma.cart_items.delete({where: {id}})
        return res.status(203).json({
            message: "Cart item deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}