import { Sequelize } from "@sequelize/core";
import { MySqlDialect } from "@sequelize/mysql";

// Initialize Sequelize without specifying a database
const sequelize = new Sequelize({
    dialect: MySqlDialect,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: 3306,
});

// Create the database
sequelize.query("CREATE DATABASE IF NOT EXISTS " + process.env.DB_NAME + ';')
    .then(() => {
        // Ok / already exists
    })
    .catch(err => {
        console.error("Unable to create the database:", err);
    })
    .finally(() => {
        sequelize.close();
});