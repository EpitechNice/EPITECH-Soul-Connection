import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js"
import Customer from "../models/customerModel.js"
import Employee from "../models/employeeModel.js";

import * as jwt from "jsonwebtoken";

async function getAllClients(req, res, next) {
    try {
        const customers = await Customer.findAll({
            attributes: { exclude: ['password'] }
        });

        res.status(200).json({
            customers,
        });
    } catch (err) {
        console.error(err);
        next(new ErrorHandler("An error occurred while fetching all clients", 500));
    }
}

async function getCoachClients(req, res, next) {
    try {
        const userId = req.user?.id;

        const allclient = await Customer.findAll({
            attributes: { exclude: ['password'] }
        });

        const coach = await Employee.findOne({
            where: { id: userId },
            include: {
                model: Customer,
                as: "client_list",
                required: false,
            },
        });
        if (!coach)
            return next(new ErrorHandler(`Coach with ID ${userId} not found`, 404));
        res.status(200).json({
            clients: coach.client_list,
        });

    } catch (err) {
        console.error(err);
        next(new ErrorHandler("An error occurred while fetching coach clients", 500));
    }
}

// Display all customers: /api/customers
export const getCustomers = catchAsyncErrors(async (req, res, next) => {
    try {
        var cookie = req.cookies.token;
        const decoded = jwt.verify(cookie, process.env.SECRET_KEY);
        const userId = decoded.id;
        const user = await Customer.findByPk(userId);

        if (!user)
            return next(new ErrorHandler(`Customer not found`, 404));

        const userType = user.type;

        if (!userType)
            return next(new ErrorHandler(`Invalid user type`, 404));
        switch(userType) {
            case "Manager":
                getAllClients(req, res, next);
                break;
            case "Coach":
                getCoachClients(req, res, next, req.user?.id);
                break;
            default:
                break;
          }

    } catch (err) {
        console.error(err);
        next(new ErrorHandler("An error occurred while fetching employees", 500));
    }
});


