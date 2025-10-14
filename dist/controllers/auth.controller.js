import { $Enums, PrismaClient, user_role } from '@prisma/client';
import { z } from 'zod';
import { hash_password } from "../utils/password_hasher.js";
import { verify_password } from "../utils/password_hasher.js";
import { sign_token } from "../services/token_sign-verify.js";
const prisma = new PrismaClient();
export const create_user_schema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.email(),
    password: z.string(),
    role: z.enum(user_role).default("customer"),
    store_name: z.string().optional(),
    description: z.string().optional()
});
export const get_user_schema = z.object({
    email: z.email()
});
export const update_user_schema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.email(),
    role: z.enum(user_role).default("customer"),
    store_name: z.string().optional(),
    description: z.string().optional()
});
export const login_user_schema = z.object({
    email: z.email(),
    password: z.string()
});
export const sign_up = async (req, res) => {
    const { first_name, last_name, email, password, role, store_name, description } = req.body;
    try {
        if (role === "seller" && (!store_name || store_name.trim() === "" || !description))
            return res.status(400).json({ message: "Seller profile creation requires store name to be provided" });
        const existing_user = await prisma.users.findUnique({ where: { email } });
        if (existing_user)
            return res.status(400).json({ message: "User already exists with the provided email" });
        const hashed_password = await hash_password(password);
        const result = await prisma.$transaction(async (tx) => {
            const user = await tx.users.create({ data: { first_name, last_name, email, password_hash: hashed_password, role } });
            const { password_hash, ...rest_user } = user;
            if (role === "seller") {
                await tx.seller_profiles.create({
                    data: {
                        seller_id: user.id,
                        store_name: store_name,
                        description: description
                    }
                });
            }
            return rest_user;
        });
        return res.status(201).json({
            message: "User created successfully",
            user: result
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to create user",
            error
        });
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.users.findUnique({
            where: { email }
        });
        if (!user)
            return res.status(401).json({ message: "Invalid credentials provided" });
        const is_password_correct = await verify_password(user.password_hash, password);
        if (is_password_correct) {
            const user_payload = {
                user_id: user.id,
                user_email: user.email,
                user_role: user.role
            };
            const access_token = sign_token(user_payload).access_token;
            const refresh_token = sign_token(user_payload).refresh_token;
            const { password_hash, ...rest_user } = user;
            return res.status(200).json({
                message: "User logged in successfully",
                access_token,
                refresh_token,
                user: rest_user
            });
        }
        return res.status(401).json({ message: "Invalid credentials provided" });
    }
    catch (error) {
        return res.status(500).json({
            message: "Couldn't perform a login operation",
            error
        });
    }
};
export const update_user = async (req, res) => {
    const { first_name, last_name, email, role, store_name, description } = req.body;
    try {
        if (role === "seller" && (!store_name || store_name.trim() === "" || !description))
            return res.status(400).json({ message: "Seller profile creation requires store name to be provided" });
        const result = await prisma.$transaction(async (tx) => {
            const user = await tx.users.update({
                where: { email },
                data: { first_name, last_name, role }
            });
            const { password_hash, ...rest_user } = user;
            if (role === "seller") {
                await tx.seller_profiles.create({
                    data: {
                        seller_id: user.id,
                        store_name: store_name,
                        description: description
                    }
                });
            }
            return rest_user;
        });
        return res.status(200).json({
            message: "User updated successfully",
            updated_user: result
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Couldn't update the user",
            error
        });
    }
};
export const get_user = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await prisma.users.findUnique({
            where: { email }
        });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        const { password_hash, ...rest_user } = user;
        return res.status(200).json({
            message: "User found successfully",
            user: rest_user
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to get user",
            error
        });
    }
};
//Admin purpose only
export const get_all_users = async (req, res) => {
    try {
        let no_pass_users = [];
        const users = await prisma.users.findMany();
        if (!users)
            return res.status(404).json({ message: "No user was found" });
        users.map((user) => {
            const { password_hash, ...rest_user } = user;
            no_pass_users.push(rest_user);
        });
        return res.status(200).json({
            message: "Users fetched successfully",
            users: no_pass_users
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to fetch users",
            error
        });
    }
};
//# sourceMappingURL=auth.controller.js.map