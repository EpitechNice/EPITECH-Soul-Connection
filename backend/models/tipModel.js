import { Model, DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

class Tip extends Model {}

Tip.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    tip: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "Tip",
    tableName: "tips",
    timestamps: true,
});

export default Tip;