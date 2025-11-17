import type { Request, Response } from "express";
import { z } from 'zod'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const create_cart = async (req: Request, res: Response<{message: string, error?: unknown}>) => {}
export const get_cart = async (req: Request, res: Response<{message: string, error?: unknown}>) => {}
export const update_cart = async (req: Request, res: Response<{message: string, error?: unknown}>) => {}
export const delete_cart = async (req: Request, res: Response<{message: string, error?: unknown}>) => {}