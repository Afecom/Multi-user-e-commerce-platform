import dotenv from 'dotenv'
dotenv.config()
import type { Dialect } from 'sequelize'

interface Iconifg {
    username: string,
    password: string,
    host: string,
    port: number,
    database: string,
    dialect: Dialect
}

export const development: Iconifg = {
    username: process.env.DB_USER as string,
    password: process.env.DB_PASS as string,
    host: process.env.DB_HOST as string,
    port: process.env.DB_PORT as unknown as number,
    database: process.env.DB_NAME as string,
    dialect: "postgres"
}

export default { development }