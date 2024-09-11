import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js"
import Customer from "../models/customerModel.js"
import Employee, { employeeType } from "../models/employeeModel.js";

import path from "path";
import * as fs from "fs";

import jwt from "jsonwebtoken";
import Payment from "../models/paymentModel.js";

const DEFAULT_IMAGE_PATH = "/usr/src/app/images/default.png"

const mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

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
        const user = await Employee.findByPk(userId);

        if (!user)
            return next(new ErrorHandler(`Customer not found`, 404));

        const userType = user.type;

        if (!userType)
            return next(new ErrorHandler(`Invalid user type`, 404));
        switch(userType) {
            case employeeType.MANAGER:
                getAllClients(req, res, next);
                break;
            case employeeType.COACH:
                getCoachClients(req, res, next, req.user?.id);
                break;
            default:
                break;
          }

    } catch (err) {
        console.error(err);
        next(new ErrorHandler("An error occurred while fetching customers", 500));
    }
});

//Get customer details: /customers/:id
export const getCustomerDetails = catchAsyncErrors(async (req, res, next) => {
    try {
        var cookie = req.cookies.token;
        const decoded = jwt.verify(cookie, process.env.SECRET_KEY);
        const coachId = decoded.id;
        const user = await Employee.findByPk(coachId);

        const userId = req.params.id;
        const customer = await Customer.findByPk(userId);

        if (user.type == employeeType.COACH) {
            const coach = await Employee.findOne({
                where: { id: userId },
                include: {
                    model: Customer,
                    as: "client_list",
                    required: false,
                },
            });
            res.status(200).json(coach.client_list);
            return;
        }

        if (customer == null) {
            res.status(404).end('Not found');
            return;
        }
        res.status(200).json(customer);
    } catch(err) {
        console.error(err);
        newt(new ErrorHandler("An error occurred while fetching customers", 500))
    }
});

//Get customer image: /customers/:id/image
export const getCustomerImg = catchAsyncErrors(async (req, res, next) => {
    try {
        const customer = await Customer.findByPk(req.params.id);

        let imagePath = DEFAULT_IMAGE_PATH;

        if (customer)
            imagePath = customer.image_path;

        var type = mime[path.extname(imagePath).slice(1)] || 'text/plain';
        var s = fs.createReadStream(imagePath);
        s.on('open', function () {
            res.set('Content-Type', type);
            s.pipe(res);
        });
        s.on('error', function () {
            res.status(404).end('Not found');
        });
    } catch (err) {
        console.error(err);
        newt(new ErrorHandler("An error occurred while fetching customers", 500))
    }
});

//Get customer payment: /customers/:id/payments_history
export const getCustomerPayments = catchAsyncErrors(async (req, res, next) => {
    try {
        const customer = await Customer.findByPk(req.params.id);

        const payments = await Payment.findAll({
            where: {
                userId: customer.id,
            }
        })

        res.status(200).json(payments);
    } catch (err) {

    }
});

export const getCustomerClothes = catchAsyncErrors(async (req, res, next) => {
});

export const createCustomer = catchAsyncErrors(async (req, res) => {
    try {
        const modifiedBody = {
            ...req.body,
            image_path: DEFAULT_IMAGE_PATH,
        };

        const customer = await Customer.create(modifiedBody);

        res.status(201).json({
            message: "New customer created successfully",
            customer,
        });

    } catch (err) {
        console.error(err);
        res.status(400).json({
            error: "Failed to create customer",
            details: err.message
        });
    }
});

export const updateCustomer = catchAsyncErrors(async (req, res, next) => {
    let customerId = req?.params?.id;

    const customer = await Customer.findByPk(customerId);

    if (!customer) {
        return next(new ErrorHandler(`Customer '${customerId}' not found`, 404));
    }

    try {
        const updatedCustomer = await customer.update(
            req.body,
            { returning: true }
        );

        res.status(200).json({
            message: "Customer updated successfully",
            data: updatedCustomer,
        });
    } catch (err) {
        console.error(err);
        next(new ErrorHandler("An error occurred while updating the customer", err.status));
    }
});

//Delete customer item: /clothes
export const deleteCustomer = catchAsyncErrors(async (req, res, next) => {
    let id = req?.params?.id;

    if (!id || isNaN(id)) {
        return next(new ErrorHandler("Invalid customer ID", 400));
    }

    const customer = await Customer.findByPk(id);

    if (!customer)
        return next(new ErrorHandler(`Customer '${id}' not found`, 404));

    try {
        const result = await customer.destroy({
            returning: true
        });

        res.status(200).json({
            message: "Customer deleted successfully",
            count: result[0]
        });
    } catch (err) {
        console.error(err);
        next(new ErrorHandler("An error occurred while deleting the customer", 500));
    }
});