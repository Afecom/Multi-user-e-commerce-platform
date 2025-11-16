import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from 'zod'

const prisma = new PrismaClient()

export const create_category_schema = z.object({
    seller_id: z.string().optional(),
    name: z.string().min(5, "Name is required"),
    description: z.string().optional()
})

type create_category_request = z.infer<typeof create_category_schema>
interface category {
    name: string,
     description: string | null,
    id: string,
    created_at: Date,
    updated_at: Date,
    seller_profiles_id: string | null,
}


export const create_category = async (req: Request<{}, {}, create_category_request>, res: Response<{message: string, error?: unknown, category?: category}>) => {
    const { seller_id, name, description } = create_category_schema.parse(req.body)
    try {
        const category = await prisma.categories.create({
            data: {
                name,
                ...(seller_id !== undefined && {seller_profiles_id: seller_id}),
                ...(description !== undefined && {description})
            }
        })
        return res.status(201).json({
            message: "Category created successfully",
            category
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}
export const get_category = async (req: Request, res: Response) => {}
export const update_category = async (req: Request, res: Response) => {}
export const delete_category = async (req: Request, res: Response) => {}