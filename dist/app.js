import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());
app.use('/', (req, res) => {
    res.send("Hello world");
});
const port = process.env.APP_PORT;
app.listen(port, () => {
    console.log("The server is up and running on port ", port);
});
//# sourceMappingURL=app.js.map