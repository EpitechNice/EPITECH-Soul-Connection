import { Model, DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

class Clothing extends Model {}

Clothing.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    image_path: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    sequelize,
    modelName: "Clothing",
    tableName: "Clothings",
    timestamps: true,
});

export default Clothing;

/*
 * Implicit attributes:
 * - users
*/