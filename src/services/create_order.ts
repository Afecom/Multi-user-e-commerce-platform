import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const create_order = async (user_id: string) => {
    try {
       return prisma.$transaction(async (tx) => {
        const cart = await tx.carts.findFirst({
            where: {user_id, status :"active"},
            include: {
                cart_items: {
                    include: {product: true}
                }
            }
        })
        if(!cart) throw new Error
        const total_amount = cart.cart_items.reduce((sum, item) => sum + item.quantity * Number(item.product.price), 0 )
        const order = await tx.orders.create({data: {user_id, total_amount}})
        for(const item of cart.cart_items){
            await tx.order_items.create({data: {
                order_id: order.id,
                product_id: item.product.id,
                unit_price: item.product.price,
                quantity: item.quantity
            }})
        }
        await tx.carts.update({
            where: {id: cart.id},
            data: {status: "checked_out"}
        })
        return order
       })
    } catch (error) {
        return error
    }
}