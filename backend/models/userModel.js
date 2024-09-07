import sequelize from "../config/database.js";
import { Model, DataTypes } from "sequelize";
import Encounter from "./encounterModel.js";
import Clothe from "./clothesModel.js";
import Payment from "./paymentModel.js";

class User extends Model {}

User.init({
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

    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    type: {
        type: DataTypes.ENUM("Manager", "Coach", "Client"),
        allowNull: false,
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

    image_path: {                                       //
        type: DataTypes.STRING,                         // Only for
        allowNull: true,                                // Client
    },                                                  //

    astrological_sign: {                                //
        type: DataTypes.STRING,                         // Only for
        allowNull: true,                                // Client
    },                                                  //

    description: {                                      //
        type: DataTypes.STRING,                         // Only for
        allowNull: true,                                // Client
    },                                                  //

    coach_id: {                                         //
        type: DataTypes.INTEGER,                        //
        allowNull: true,                                // Only for
        references: {                                   // Clients && Coach
            model: "users",                             //
            key: "id",                                  //
        }                                               //
    },                                                  //

    cloth_id: {                                         //
        type: DataTypes.INTEGER,                        //
        allowNull: true,                                // Only for
        references: {                                   // Clients
            model: "clothes",                           //
            key: "id",                                  //
        }                                               //
    },                                                  //

    encounter_id: {                                     //
        type: DataTypes.INTEGER,                        //
        allowNull: true,                                // Only for
        references: {                                   // Clients
            model: "encounters",                        //
            key: "id",                                  //
        }                                               //
    },                                                  //

    payment_id: {                                       //
        type: DataTypes.INTEGER,                        //
        allowNull: true,                                // Only for
        references: {                                   // Clients
            model: "payments",                          //
            key: "id",                                  //
        }                                               //
    },                                                  //


    work: {                                             //
        type: DataTypes.STRING,                         // Only for
        allowNull: true,                                // Employee
    }                                                   //
}, {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
});

/*
 * Implicit attributes:
 * - client_list
 * - coach
 * - clothes
 * - encounter_list
*/

// This setup the client-coach One-to-Many and Many-to-One relation

User.hasMany(User, {
    as: "client_list",
    foreignKey: "coach_id",
});

User.belongsTo(User, {
    as: "coach",
    foreignKey: "coach_id",
});

// Interaction between client and clothe

User.belongsToMany(Clothe, {
    through: "UserClothes",
    as: "clothes",
    foreignKey: "user_id",
})

Clothe.belongsToMany(User, {
    through: "UserClothes",
    as: "users",
    foreignKey: "cloth_id",
})

// Interaction between client and encounter

User.hasMany(Encounter, {
    as: "encounter_list",
    foreignKey: "encounter_id"
})

Encounter.belongsTo(User, {
    as: "user",
    foreignKey: "customer_id",
})

// Interaction between client and payments

User.hasMany(Payment, {
    as: "payment_list",
    foreignKey: "payment_id"
})

Payment.belongsTo(User, {
    as: "user",
    foreignKey: "customer_id",
})

export default User;
