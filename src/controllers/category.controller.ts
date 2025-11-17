import type { Request, Response } from "express";
import type { category_req } from "../middlewares/access_control_middlewares/category_access_control.js";
import { PrismaClient } from "@prisma/client";
import { z } from 'zod'

const prisma = new PrismaClient()

export const create_category_schema = z.object({
    seller_id: z.string().optional(),
    name: z.string().min(5, "Name is required"),
    description: z.string().optional()
})

export const get_category_schema = z.object({
    id: z.string()
})

export const update_category_schema = z.object({
    id: z.string(),
    name: z.string().optional(),
    description: z.string().optional(),
    seller_profiles_id: z.string().optional()
})

type create_category_request = z.infer<typeof create_category_schema>
type get_category_request = z.infer<typeof get_category_schema>

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
export const get_category = async (req: Request<{}, {}, get_category_request>, res: Response<{message: string, error?: unknown, category?: category}>) => {
    const { id } = get_category_schema.parse(req.params)
    try {
        const category = await prisma.categories.findUnique({
            where: {id}
        })
        if(!category) return res.status(404).json({
            message: "Category not found"
        })
        return res.status(200).json({
            message: "Category found successfully",
            category
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}
export const update_category = async (req: category_req, res: Response<{message: string, error?: unknown, category?: category}>): Promise<Response> => {
    const { name, description, seller_profiles_id, id} = update_category_schema.parse(req.body)
    try {
        const updated_category = await prisma.categories.update({
            where: {id},
            data: {
                ...(name !== undefined && {name}),
                ...(description !== undefined && {description}),
                ...(seller_profiles_id !== undefined && {seller_profiles_id})
            }
        })
        return res.status(201).json({
            message: "Category updated successfully",
            category: updated_category
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}
export const delete_category = async (req: category_req<{}, {}, get_category_request>, res: Response<{message: string, error?: unknown}>) => {
    const { id } = get_category_schema.parse(req.body)
    try {
        await prisma.categories.delete({
            where: {id}
        })
        return res.status(203).json({
            message: "Category deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}