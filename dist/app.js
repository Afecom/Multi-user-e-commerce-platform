import express from 'express';
import db_envs from './configs/dbenv.config.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());
app.use('/', (req, res) => {
    res.send("Hello world");
});
const db_connection = async () => {
    try {
        await db_envs['dev_db'].authenticate();
        console.log("Database connected successfully");
    }
    catch (error) {
        console.log("Couldn't connect to the database", error);
        process.exit(1);
    }
};
db_connection();
const port = process.env.APP_PORT;
app.listen(port, () => {
    console.log("The server is up and running on port ", port);
});
//# sourceMappingURL=app.js.map