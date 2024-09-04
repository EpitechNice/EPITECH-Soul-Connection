import { sequelize } from "../local_db/database";
import { Model, DataTypes } from "sequelize";
import { Encounter } from "./Encounters";
import { Clothe } from "./Clothe";

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
        allowNull: false,
    },

    type: {
        type: DataTypes.ENUM("Manager", "Employee", "Client"),
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
        references: {                                   // Clients
            model: "Users",                             //
            key: "id",                                  //
        }                                               //
    },                                                  //

    encounter_id: {                                         //
        type: DataTypes.INTEGER,                        //
        allowNull: true,                                // Only for
        references: {                                   // Clients
            model: "Encounter",                             //
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

export default User;