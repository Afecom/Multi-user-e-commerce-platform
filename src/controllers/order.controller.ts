import type { Request, Response } from "express";
import { z } from 'zod'
import { PrismaClient } from "@prisma/client";
import { create_order } from "../services/create_order.js";

const prisma = new PrismaClient()

export const get_orders_by_user_id_schema = z.object({
    user_id: z.string()
})
export const get_orders_by_id_schema = z.object({
    id: z.string()
})
export const checkout_request_schema = z.object({
    user_id: z.string(),
})

type get_orders_by_user_id_request = z.infer<typeof get_orders_by_user_id_schema>
type get_orders_by_id_request = z.infer<typeof get_orders_by_id_schema>
type checkout_request = z.infer<typeof checkout_request_schema>

export const get_orders_by_user_id = async (req: Request<{user_id: string}>, res: Response): Promise<Response> => {
    const { user_id } = get_orders_by_user_id_schema.parse(req.params)
    try {
        const orders = await prisma.orders.findMany({where: {user_id}})
        if(!orders) return res.status(404).json({message: "Couldn't find orders associated with the user"})
        return res.status(200).json({
            message: "Orders fetched successfully",
            orders
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}
export const get_orders_by_id = async (req: Request<{id: string}>, res: Response): Promise<Response> => {
    const { id } = get_orders_by_id_schema.parse(req.params)
    try {
        const order = await prisma.orders.findUnique({where: {id}})
        if(!order) return res.status(404).json({message: "Couldn't find an order with the provided ID"})
        return res.status(200).json({
            message: "Order found successfully",
            order
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}

export const checkout = async (req: Request<{}, {}, checkout_request>, res: Response) => {
    const { user_id } = checkout_request_schema.parse(req.body)
    try {
        const order = await create_order(user_id)
        return res.status(201).json({
            message: "Order places successfully",
            order
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}