import { Sequelize } from "sequelize";
import sequelize from "./dbConfig.js";

import Clothing from "../models/clothingModel.js";
import Customer from "../models/customerModel.js";
import Employee from "../models/employeeModel.js";
import Encounter from "../models/encounterModel.js";
import Event from "../models/eventModel.js";
import Payment from "../models/paymentModel.js";
import Tip from "../models/tipModel.js";


export function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function setupDB()
{
    await sequelize.query(`USE ${process.env.DB_NAME};`);
    await sequelize.sync({
        force: false
    });
}

async function tryCreateDB() {
    const db_connection = new Sequelize({
        dialect: "mysql",
        host: process.env.DB_HOST,
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

    try {
        await db_connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`)
        console.log("\x1b[34m%s\x1b[0m", "[INFO] DB Connection successfull !");

        return true;
    } catch (err) {
        console.error('\x1b[31m%s\x1b[0m', `[ERROR] Could not connect to DB at the time: ${err.message}`);
        console.error('\x1b[31m%s\x1b[0m', "        Retrying in 3 seconds");
    } finally {
        await db_connection.close();
    }

    await delay(3000);
    return false;
}

export async function createDB() {
    while (true) {
        const success = await tryCreateDB();
        if (success)
            break;
    }

    await setupDB(sequelize);
    console.log("\x1b[34m%s\x1b[0m", "[INFO] DB Initiation successfull");
}