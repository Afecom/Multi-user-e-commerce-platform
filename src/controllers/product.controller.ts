import { PrismaClient } from '@prisma/client'
import type { Request, Response } from 'express'
import { string, z } from 'zod'

const prisma = new PrismaClient()

export const create_product_schema = z.object({
    seller_profiles_id: z.string(),
    name: z.string(),
    description: z.string().min(20, "Description should at least be 20 in length"),
    stock: z.int().optional(),
    image_URL: z.url(),
    price: z.number(),
    category_ids: z.array(string()).optional()
})

export const get_product_schema = z.object({
    id: z.string()
})

export const update_product_schema = z.object({
    seller_profiles_id: z.string().optional(),
    name: z.string().optional(),
    description: z.string().min(20, "Minimum length of description should be 20").optional(),
    stock: z.number().optional(),
    image_URL: z.string().optional(),
    price: z.number().optional(),
    category_ids: z.array(string()).optional()
})

type create_product_request = z.infer<typeof create_product_schema>
type get_product_request = z.infer<typeof get_product_schema>
type update_category_request = z.infer<typeof update_product_schema>

interface product {
    seller_profiles_id: string;
    name: string;
    description: string;
    stock: number | null;
    image_URL: string;
    price: number;
    id: string;
    rating: number | null;
    created_at: Date;
    updated_at: Date;
}

export const create_product = async (req: Request<{}, {}, create_product_request>, res: Response<{message: string, error?: unknown, product?: product}>): Promise<Response> => {
    const { seller_profiles_id, name, description, stock, image_URL, price, category_ids } = create_product_schema.parse(req.body)
    try {
        const created = await prisma.products.create({
            data: {
                seller_profiles_id,
                name,
                description,
                image_URL,
                price,
                ...(stock !== undefined && {stock}),
                ...(category_ids !== undefined && {
                    category: {
                        connect: category_ids.map((id) => ({id}))
                    }
                })
            }
        })

        const created_product: product = {
            id: created.id,
            seller_profiles_id: created.seller_profiles_id,
            name: created.name,
            description: created.description,
            image_URL: created.image_URL,
            price: Number(created.price),
            stock: created.stock,
            rating: created.rating !== null ? Number(created.rating) : null,
            created_at: created.created_at,
            updated_at: created.updated_at
        }
        return res.status(201).json({
            message: "Product created successfully",
            product: created_product
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}
export const get_product = async (req: Request<{id: string}>, res: Response<{message: string, error?: unknown, product?: product}>): Promise<Response> => {
    const { id } = get_product_schema.parse(req.params)
    try {
        const product = await prisma.products.findUnique({where: {id}})
        if(!product) return res.status(404).json({message: "Product not found with the provided ID"})
            const fetched_product: product = {
            id: product.id,
            seller_profiles_id: product.seller_profiles_id,
            name: product.name,
            description: product.description,
            image_URL: product.image_URL,
            price: Number(product.price),
            stock: product.stock,
            rating: product.rating !== null ? Number(product.rating) : null,
            created_at: product.created_at,
            updated_at: product.updated_at
        }
        return res.status(200).json({
            message: "Product found successfully",
            product: fetched_product
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}
export const update_product = async (req: Request<{id: string}, {}, update_category_request>, res: Response<{message: string, error?: unknown, product?: product}>): Promise<Response> => {
    const { id } = get_product_schema.parse(req.params)
    const { seller_profiles_id, stock, name, description, price, category_ids, image_URL } = update_product_schema.parse(req.body)
    try {
        const updated = await prisma.products.update({
            where: {id},
            data: {
                ...(seller_profiles_id !== undefined && {seller_profiles_id}),
                ...(stock !== undefined && {stock}),
                ...(name !== undefined && {name}),
                ...(description !== undefined && {description}),
                ...(price !== undefined && {price}),
                ...(category_ids !== undefined && {
                    category: {
                        set: category_ids.map((id) => ({id}))
                    }
                }),
                ...(image_URL !== undefined && {image_URL})
            }
        })
        const updated_product: product = {
            id: updated.id,
            seller_profiles_id: updated.seller_profiles_id,
            stock: updated.stock,
            name: updated.name,
            description: updated.description,
            price: Number(updated.price),
            updated_at: updated.updated_at,
            created_at: updated.created_at,
            image_URL: updated.image_URL,
            rating: updated.rating !== null ? Number(updated.rating) : null
        }
        return res.status(200).json({
            message: "Product updated successfully",
            product: updated_product
        })
    } catch (error) {
       return res.status(500).json({
        message: "Internal server error",
        error
       }) 
    }
}
export const delete_product = async (req: Request<{id: string}>, res: Response<{message: string, error?: unknown}>): Promise<Response> => {
    const { id } = get_product_schema.parse(req.params)
    try {
        await prisma.products.delete({where: {id}})
        return res.status(203).json({
            message: "Product deleted successfully"
        })
    }  catch (error){
        return res.status(500).json({
            message: "Intenal server error",
            error
        })
    }
}