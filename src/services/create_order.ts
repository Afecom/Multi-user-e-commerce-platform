import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const create_order = async (user_id: string) => {
    try {
        const cart = await prisma.carts.findUnique({
            where: {user_id},
            include: {cart_items: {
                include: {product: true}
            }}
        })
        if(!cart) return false
        const total = cart.cart_items.reduce((sum, item) => sum + item.quantity * Number(item.product.price),
        0
        )  
        const order = await prisma.orders.create({data: {user_id, total_amount: total}})
        

    } catch (error) {
        
    }
}