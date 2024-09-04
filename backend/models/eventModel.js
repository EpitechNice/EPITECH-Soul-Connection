import { sequelize } from "../local_db/database";
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
            model: "Users",
            key: "id",
        }
    },

    location_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})