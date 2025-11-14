import { PrismaClient } from '@prisma/client';
import { verify_token } from '../services/token_sign-verify.js';
import { z } from 'zod';
const prisma = new PrismaClient();
export const get_seller_schema = z.object({
    email: z.email()
});
export const update_seller = async (req, res) => { };
export const get_seller = async (req, res) => {
    try {
        const user = req.target_user;
        if (!user)
            return res.status(404).json({ message: "A user was not found with the provided email" });
        const seller = await prisma.seller_profiles.findUnique({ where: { seller_id: user.id }, include: {
                seller: { select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        created_at: true,
                        updated_at: true
                    } }
            } });
        if (!seller)
            return res.status(404).json({ message: "A seller profile was not found for the user with the email provided" });
        return res.status(200).json({
            message: "Seller profile found successfully",
            seller
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Couldn't find seller",
            error
        });
    }
};
// Admin purpose
export const get_sellers = async (req, res) => {
    try {
        const sellers = await prisma.seller_profiles.findMany({
            include: {
                seller: { select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        created_at: true,
                        updated_at: true
                    } }
            }
        });
        if (!sellers)
            return res.status(404).json({ message: "Couldn't find any sellers" });
        return res.status(200).json({
            message: "Seller profiles are found successfully",
            sellers
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
};
export const delete_seller = async (req, res) => { };
//# sourceMappingURL=seller.controller.js.map