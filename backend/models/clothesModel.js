import { Model, DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

class Clothes extends Model {}

Clothes.init({
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
    modelName: "Clothes",
    tableName: "clothes",
    timestamps: true,
});

export default Clothes;

/*
 * Implicit attributes:
 * - users
*/