import { Model, DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

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

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: "Payment",
    tableName: "payments",
    timestamps: true,
});

export default Payment;