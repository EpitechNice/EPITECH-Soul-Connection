import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: 3306,
    define: {
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci"
    },
    dialectOptions: {
        charset: 'utf8mb4',
    },
});

export default sequelize;