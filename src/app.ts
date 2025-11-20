import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import index_router from './routes/index.route.js'
import dotenv from 'dotenv'
dotenv.config()

const prisma = new PrismaClient()

const app = express()

app.use(express.json())
// Build allowed origins list: include common local dev origins and any
// origin(s) provided in FRONTEND_ORIGIN env var (comma-separated).
const defaultDevOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
]

const rawFrontendEnv = process.env.FRONTEND_ORIGIN ?? ''
const envOrigins = rawFrontendEnv
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.replace(/^'+|'+$/g, '')) // strip single quotes if present
    .map((s) => s.replace(/\/$/, '')) // remove trailing slash

const allowedOrigins = Array.from(new Set([...defaultDevOrigins, ...envOrigins]))

app.use(
    cors({
        origin: (origin, cb) => {
            // Allow non-browser requests (Postman, curl) when no origin is set
            if (!origin) return cb(null, true)
            if (allowedOrigins.includes(origin)) return cb(null, true)
            return cb(new Error('CORS policy: origin not allowed'), false)
        },
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