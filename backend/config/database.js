import { Sequelize } from "sequelize";
// import { MySqlDialect } from "sequelize";

const sequ = new Sequelize({
    dialect: "mysql",
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: 3306,
});

export default sequ;