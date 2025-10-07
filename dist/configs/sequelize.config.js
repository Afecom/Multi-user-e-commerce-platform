import dotenv from 'dotenv';
dotenv.config();
export const development = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    dialect: "postgres"
};
export default { development };
//# sourceMappingURL=sequelize.config.js.map