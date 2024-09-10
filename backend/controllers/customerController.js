import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js"
import Customer from "../models/customerModel.js"
import Employee, { employeeType } from "../models/employeeModel.js";

import path from "path";
import * as fs from "fs";

import jwt from "jsonwebtoken";

const DEFAULT_PROFILE_PATH = "/usr/src/app/images/profile.png"

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

export const getCustomer = catchAsyncErrors(async (req, res, next) => {
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

export const getCustomerImg = catchAsyncErrors(async (req, res, next) => {
    const customer = await Customer.findByPk(req.params.id);

    let imagePath = DEFAULT_PROFILE_PATH;

    if (customer) {
        imagePath = customer.image_path;
    }

    // https://stackoverflow.com/questions/5823722/how-to-serve-an-image-using-nodejs
    var type = mime[path.extname(imagePath).slice(1)] || 'text/plain';
    var s = fs.createReadStream(imagePath);
    s.on('open', function () {
        res.set('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function () {
        res.status(404).end('Not found');
    });

    // res.status(200).json({
        // employeeImg,
    // });
});