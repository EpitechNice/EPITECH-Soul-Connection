import sequelize from "../config/dbConfig.js";
import { Model, DataTypes } from "sequelize";

import Employee from "./employeeModel.js";
import Encounter from "./encounterModel.js";
import Clothing from "./clothingModel.js";
import Payment from "./paymentModel.js";

class Customer extends Model {}

Customer.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    birth_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    image_path: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    astrological_sign: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "Customer",
    tableName: "customers",
    timestamps: true,
});

/*
 * Implicit attributes:
 * - coach
 * - clothings
 * - encounters
 * - payments
*/

Customer.belongsTo(Employee);
Employee.hasMany(Customer);

Customer.belongsToMany(Clothing, { through: "CustomerClothing" });
Clothing.belongsToMany(Customer, { through: "CustomerClothing" });

Encounter.belongsTo(Customer);
Customer.hasMany(Encounter);

Payment.belongsTo(Customer);
Customer.hasMany(Payment);

// This setup the client-coach One-to-Many and Many-to-One relation

// Customer.belongsTo(Employee, {
//     as: "coach",
//     foreignKey: "coach_id",
// });

// Employee.hasMany(Customer, {
//     as: "clients",
//     foreignKey: "clients_id",
// });

// // Interaction between client and clothe

// Customer.belongsToMany(Clothing, {
//     through: "UserClothings",
//     as: "clothings",
//     foreignKey: "user_id",
// })

// Clothing.belongsToMany(Customer, {
//     through: "UserClothings",
//     as: "users",
//     foreignKey: "cloth_id",
// })

// // Interaction between client and encounter

// Customer.hasMany(Encounter, {
//     as: "encounter_list",
//     foreignKey: "encounter_id"
// })

// Encounter.belongsTo(Customer, {
//     as: "user",
//     foreignKey: "customer_id",
// })

// // Interaction between client and payments

// Customer.hasMany(Payment, {
//     as: "payment_list",
//     foreignKey: "payment_id"
// })

// Payment.belongsTo(Customer, {
//     as: "user",
//     foreignKey: "customer_id",
// })

export default Customer;
