import { Sequelize } from "sequelize";
import User from "../models/userModel.js";
import newEmployees from "./employeeData.js";
import { createDB } from "../config/dbCreate.js";

const seedEmployees = async () => {
  try {
    createDB();

    // await sequelize.authenticate();
    console.log("\x1b[32m%s\x1b[0m", "Connected to the database successfully");

    // // Delete existing products
    // await User.destroy({ where: {}, truncate: true });
    // console.log("\x1b[33m%s\x1b[0m", "All employees are deleted");

    // Insert new employees
    await User.bulkCreate(newEmployees);
    console.log("\x1b[32m%s\x1b[0m", "New employees are added");

    // Close the connection
    await sequelize.close();
    console.log("\x1b[32m%s\x1b[0m", "Database connection closed");

    process.exit();
  } catch (error) {
    console.log('\x1b[31m%s\x1b[0m', `[ERROR] ${error.message}`);
    process.exit();
  }
};

seedEmployees();