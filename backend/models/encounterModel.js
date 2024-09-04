import sequelize from "../config/database.js";
import { Model, DataTypes } from "sequelize";

class Encounter extends Model {}

Encounter.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users",
            key: "id",
        }
    },

    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    source: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: "Encounter",
    tableName: "encounters",
    timestamps: true,
});

export default Encounter;

/*
 * Implicit attributes:
 * - customer_id
*/