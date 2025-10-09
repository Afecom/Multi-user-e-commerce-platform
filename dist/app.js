import express from 'express';
import { PrismaClient } from '@prisma/client';
import index_router from './routes/index.route.js';
import dotenv from 'dotenv';
dotenv.config();
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use('/api/v1', index_router);
app.use('/', (req, res) => {
    res.send("Hello world");
});
const db_connection = async () => {
    try {
        await prisma.$connect();
        console.log("Database connected successfully");
    }
    catch (error) {
        console.error("Couldn't connect to the database", error);
        process.exit(1);
    }
};
db_connection();
const port = process.env.APP_PORT;
app.listen(port, () => {
    console.log("The server is up and running on port ", port);
});
//# sourceMappingURL=app.js.map