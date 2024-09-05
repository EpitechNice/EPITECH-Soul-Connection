import sequelize from "../config/database.js";
import { Model, DataTypes } from "sequelize";

class Clothe extends Model {}

Clothe.init({
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
    modelName: "Clothe",
    tableName: "clothes",
    timestamps: true,
});

export default Clothe;

/*
 * Implicit attributes:
 * - users
*/