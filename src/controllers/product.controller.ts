import { PrismaClient } from '@prisma/client'
import type { Request, Response } from 'express'
import { z } from 'zod'

const prisma = new PrismaClient()

export const create_product = async (req: Request, res: Response) => {}
export const get_product = async (req: Request, res: Response) => {}
export const update_product = async (req: Request, res: Response) => {}
export const delete_product = async (req: Request, res: Response) => {}