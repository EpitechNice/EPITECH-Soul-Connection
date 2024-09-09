import sequelize from "../config/dbConfig.js";
import { Model, DataTypes } from "sequelize";
import Event from "./eventModel.js";

export const employeeType = Object.freeze({
    MANAGER: "Manager",
    COACH: "Coach",
})

class Employee extends Model {}

Employee.init({
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
        allowNull: true,
    },

    type: {
        type: DataTypes.ENUM(employeeType.MANAGER, employeeType.COACH),
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

    image_path: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    clients_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "customers",
            key: "id",
        }
    },

    event_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "events",
            key: "id",
        }
    },

    work: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: "Employee",
    tableName: "employees",
    timestamps: true,
});

/*
 * Implicit attributes:
 * - clients
 * - events
*/

Event.belongsTo(Employee);
Employee.hasMany(Event);

// Employee.hasMany(Event, {
//     as: "events",
//     foreignKey: "event_id"
// })

// Event.belongsTo(Employee, {
//     as: "employee",
//     foreignKey: "employee_id",
// })


export default Employee;
