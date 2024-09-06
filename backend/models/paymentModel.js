import sequelize from "../config/database.js";
import { Model, DataTypes } from "sequelize";

class Payment extends Model {}

Payment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "Payment",
    tableName: "payments",
    timestamps: true,
});

export default Payment;