import sequelize from "../config/database.js";
import { Model, DataTypes } from "sequelize";

class Event extends Model {}

Event.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    max_participants: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    location_x: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    location_y: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        }
    },

    location_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "Event",
    tableName: "events",
    timestamps: true,
});

export default Event;

/*
 * Implicit attributes:
 * - client_list
*/