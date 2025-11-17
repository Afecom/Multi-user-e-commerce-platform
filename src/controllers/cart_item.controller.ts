import type { Request, Response } from "express";
import { z } from 'zod'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const create_cart_item = async (req: Request, res: Response) => {}
export const get_cart_item = async (req: Request, res: Response) => {}
export const update_cart_item = async (req: Request, res: Response) => {}
export const delete_cart_item = async (req: Request, res: Response) => {}