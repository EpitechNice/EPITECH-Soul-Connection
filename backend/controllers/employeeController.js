import jwt from "jsonwebtoken";
import { hashSync, genSaltSync, compareSync } from "bcrypt";
import { randint } from "../utils/randInt.js";
import ErrorHandler from "../utils/errorHandler.js"
import { isEmail } from "../utils/typeValidator.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Customer from "../models/customerModel.js"
import Employee, { employeeType } from "../models/employeeModel.js";
import * as fs from "fs";
import path from "path";

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

// Display all employees: /api/employees
export const getEmployees = catchAsyncErrors(async (req, res, next) => {
    try {
        const coach = await Employee.findAll({
            where: { type: employeeType.COACH }, // Clarification + makes error verbose
            attributes: { exclude: ['password'] }
        });

        res.status(200).json({
            coach,
        });
    } catch (err) {
        console.error(err);
        next(new ErrorHandler("An error occurred while fetching employees", 500));
    }
});

//TODO: Validation Error
//DONE: Could not reproduce with valid logins
//Login employee: /api/employees/login
export const loginEmployee = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
        return next(new ErrorHandler("Email and password are required", 400));

    if (!isEmail(email))
        return next(new ErrorHandler("Validation error", (randint(0, 100) == 0 ? 418 : 422)));

    const result = await Employee.findOne({
        where: {
            email: email,
        }
    });

    if (!result)
        return next(new ErrorHandler("Invalid Email and Password combination", (randint(0, 100) == 0 ? 418 : 401)));

    if (!result.password)
        return next(new ErrorHandler("Invalid Email and Password combination", (randint(0, 100) == 0 ? 418 : 401)));

    if (!compareSync(password, result.password))
        return next(new ErrorHandler("Invalid Email and Password combination", (randint(0, 100) == 0 ? 418 : 401)));

    const token = jwt.sign({
        id: result.id,
        email: result.email,
        role: result.type,
        name: result.name,
        surname: result.surname,
    },
    process.env.SECRET_KEY,
    {
        expiresIn: 3 * 7 * 24 * 60 * 60,
    });

    res.status(200).cookie("token", token).json({
        token,
    });
})

// Display employee profile: /api/employees/me
export const getEmployeeProfile = catchAsyncErrors(async (req, res, next) => {
    try {
        var cookie = req.cookies.token;
        const decoded = jwt.verify(cookie, process.env.SECRET_KEY);
        const userId = decoded.id;
        const employee = await Employee.findOne({
            where: { id: userId },
            attributes: { exclude: ['password'] } // Nice
        });

        if (!employee) {
            return next(new ErrorHandler(`Employee not found`, 404));
        }

        res.status(200).json({
            employee,
        });
    } catch (err) {
        console.error(err);
        next(new ErrorHandler("An error occurred while fetching the employee profile", 500));
    }
});

//TODO: 422 Validation Error
//DONE: Could not reproduce
// Get specific employee: /api/employees/:id
export const getEmployeeDetails = catchAsyncErrors(async (req, res, next) => {
    const userId = req.params.id;
    const employee = await Employee.findOne({
        where: { id: userId },
        attributes: { exclude: ['password'] }
    });

    if (!employee) { // || employee.type === "Client") { // Not relevent: Employee.type = ENUM(employeeType.COACH, employeeType.MANAGER)
        return next(new ErrorHandler("Employee requested doesn't exist", 404));
    }

    res.status(200).json({
        employee,
    });
});

//TODO: To fix
//TODO: 422 Validation Error, image by default if no image (frontend)
//DONE: Need review
// Get specific employee: /api/employees/:id/image
export const getEmployeeImg = catchAsyncErrors(async (req, res, next) => {
    const employee = await Employee.findByPk(req.params.id);

    let imagePath = DEFAULT_PROFILE_PATH;

    if (employee) { // || employee.type === "Client") { // Not relevent: Employee.type = ENUM(employeeType.COACH, employeeType.MANAGER)
        // return next(new ErrorHandler("Employee requested doesn't exist", 404));
        imagePath = employee.image_path;
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


//TODO: errorHandle 422 Validation error
//DONE: No verifications done on the received data: "null" on birth_date will make an error
//      No limitations on the type: a Manager can create another Manager
//  Need review
// Note: running fetch will overwrite any changes made using that method
//       Fetch is like "clear db and remake it from the ground"
// Create new employee: /api/employees
export const createEmployee = catchAsyncErrors(async (req, res) => {
    try {
        const salt = genSaltSync(10);

        const modifiedBody = {
            ...req.body,
            password: req.body.password ? hashSync(req.body.password, salt) : null,
            birth_date: new Date(req.body.birth_date),
            image_path: DEFAULT_PROFILE_PATH,
        };

        const employee = await Employee.create(modifiedBody);

        res.status(201).json({
            message: "New employee created successfully",
            employee,
        });

    } catch (err) {
        console.error(err);
        res.status(400).json({
            error: "Failed to create employee",
            details: err.message
        });
    }
});

//TODO: TO FIX
//DONE: Need review
// Update specific employee: /api/employees/:id
export const updateEmployee = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;

    if (!id ) {
        return next(new ErrorHandler("Invalid employee ID", 400));
    }

    try {
        // const newData = {
            // name: req.body.name,
            // email: req.body.email,
            // role: req.body.role
        // };

        if (req.body.password !== undefined)
            req.body.password = hashSync(req.body.password, genSaltSync(10));

        const fieldUpdated = await Employee.update(
            { ...req.body },
            { where: { id: id } }
        );

        res.status(200).json({
            "fieldUpdated": fieldUpdated,
        });
    } catch (err) {
        console.error(err);
        next(new ErrorHandler("An error occurred while updating the employee", 500));
    }
});

//TODO: TO FIX
//Nothing to do: Seems to be working, for me
// Delete specific employee: /api/employees/:id
export const deleteEmployee = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id

    if (!id || isNaN(id)) {
        return next(new ErrorHandler("Invalid employee ID", 400));
    }

    try {
        const result = await Employee.destroy({
            where: { id: parseInt(id) },
            returning: true
        });

        if (result[0] === 0) {
            return next(new ErrorHandler("Employee not found", 404));
        }

        res.status(200).json({
            message: "Employee deleted successfully",
            count: result[0]
        });
    } catch (err) {
        console.error(err);
        next(new ErrorHandler("An error occurred while deleting the employee", 500));
    }
});