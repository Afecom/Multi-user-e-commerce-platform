import { PrismaClient } from '@prisma/client'
import type { Decimal } from '@prisma/client/runtime/library'
import type { Request, Response } from 'express'
import { z } from 'zod'

const prisma = new PrismaClient()

export const get_seller_schema = z.object({
    email: z.email()
})

type get_seller_request = z.infer<typeof get_seller_schema>
type seller = {
    id: string;
    created_at: Date;
    updated_at: Date;
    seller_id: string;
    store_name: string;
    description: string;
    rating: Decimal | null
}

// export const create_seller = async (req: Request, res: Response) => {}

export const update_seller = async (req: Request, res: Response) => {}

export const get_seller = async (req: Request<{}, {}, get_seller_request>, res: Response<{message: string, seller?: seller, error?: unknown}>): Promise<Response> => {
    const { email } = req.body
    try {
        const user = await prisma.users.findUnique({
            where: { email }
        })
        if (!user) return res.status(404).json({message: "User not found with the provided email"})
        const seller = await prisma.seller_profiles.findUnique({
            where: {
                seller_id: user.id
            }
        })
        if(!seller) return res.status(404).json({message: "Seller not found with the provided email"})
        return res.status(200).json({
            message: "Seller found successfully",
            seller
        })
    } catch (error) {
        return res.status(500).json({
            message: "Couldn't find seller",
            error
        })
    }
}

// Admin purpose
export const get_sellers = async (req: Request, res: Response) => {}

export const delete_seller = async (req: Request, res: Response) => {}