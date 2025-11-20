import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import index_router from './routes/index.route.js'
import dotenv from 'dotenv'
dotenv.config()

const prisma = new PrismaClient()

const app = express()

app.use(express.json())
const frontendOrigin = process.env.FRONTEND_ORIGIN ?? 'https://multi-user-e-commerce-platform-fron.vercel.app/'
app.use(
    cors({
        origin: frontendOrigin,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
)
app.use('/api/v1', index_router)
app.use('/', (req, res) => {
    res.send("Hello world")
})

const db_connection = async () => {
    try {
        await prisma.$connect()
        console.log("Database connected successfully")
    } catch (error) {
        console.error("Couldn't connect to the database", error)
        process.exit(1)
    }
}

db_connection()

const port = process.env.APP_PORT as string
app.listen(port, () => {
    console.log("The server is up and running on port ", port)
})