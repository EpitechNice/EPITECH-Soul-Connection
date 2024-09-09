import jwt from "jsonwebtoken";
import { hashSync, genSaltSync } from "bcrypt";
import { compareSync } from "bcrypt";
import { randint } from "../utils/randInt.js";
import ErrorHandler from "../utils/errorHandler.js"
import { isEmail } from "../utils/typeValidator.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/userModel.js"

// Display all employees: /api/employees
export const getEmployees = catchAsyncErrors(async (req, res, next) => {
    try {
        const manager = await User.findAll({
            where: { type: "Manager" }
        });

        const coach = await User.findAll({
            where: { type: "Coach" }
        });

        res.status(200).json({
            manager: manager,
            coach: coach,
        });
    } catch (err) {
        console.error(err);
        next(new ErrorHandler("An error occurred while fetching employees", 500));
    }
});

//TODO: Validation Error
//Login employee: /api/employees/login
export const loginEmployee = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
        return next(new ErrorHandler("Email and password are required", 400));

    if (!isEmail(email))
        return next(new ErrorHandler("Validation error", (randint(0, 100) == 0 ? 418 : 422)));

    const result = await User.findAll({
        where: {
            email: email,
        }
    });

    let luser = null;

    for (var user in result)
        if (compareSync(password, result[user].password))
            luser = result[user];

    if (luser === null)
        return next(new ErrorHandler("Invalid Email and Password combination", (randint(0, 100) == 0 ? 418 : 401)));

    const token = jwt.sign({
        id: luser.id,
        email: luser.email,
        role: luser.type,
        name: luser.name,
        surname: luser.surname,
    },
    process.env.JWT_SECRET,
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
        const employee = await User.findByPk(req?.user?.id);

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
// Get specific employee: /api/employees/:id
export const getEmployeeDetails = catchAsyncErrors(async (req, res, next) => {
    const employee = await User.findByPk(req.params.id);

    if (!employee || employee.type === "Client") {
        return next(new ErrorHandler("Employee requested doesn't exist", 404));
    }

    res.status(200).json({
        employee,
    });
});

//TODO: 422 Validation Error, image by default if no image (frontend)
// Get specific employee: /api/employees/:id/image
export const getEmployeeImg = catchAsyncErrors(async (req, res, next) => {
    const employee = await User.findByPk(req.params.id);

    if (!employee || employee.type === "Client") {
        return next(new ErrorHandler("Employee requested doesn't exist", 404));
    }

    const employeeImg = employee.image_path;

    res.status(200).json({
        employeeImg,
    });
});


// Create new employee: /api/employees
export const createEmployee = catchAsyncErrors(async (req, res) => {
    try {
        const salt = genSaltSync(10);

        const modifiedBody = {
            ...req.body,
            password: req.body.password ? hashSync(req.body.password, salt) : null,
            birth_date: new Date(req.body.birth_date),
        };

        const employee = await User.create(modifiedBody);

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

// //TODO: TO FIX
// // Update specific employee: /api/employees/:id
// export const updateEmployee = catchAsyncErrors(async (req, res, next) => {
//     const id = req.params.id;

//     if (!id ) {
//         return next(new ErrorHandler("Invalid employee ID", 400));
//     }

//     try {
//         const newData = {
//             name: req.body.name,
//             email: req.body.email,
//             role: req.body.role
//         };

//         const user = await User.findByPk(req.params.id, {
//             new: true
//         });

//         res.status(200).json({
//             user,
//         });
//     } catch (err) {
//         console.error(err);
//         next(new ErrorHandler("An error occurred while updating the employee", 500));
//     }
// });

//TODO: TO FIX
// Delete specific employee: /api/employees/:id
// export const deleteEmployee = catchAsyncErrors(async (req, res, next) => {
//     const id = req.params.id

//     if (!id || isNaN(id)) {
//         return next(new ErrorHandler("Invalid employee ID", 400));
//     }

//     try {
//         const result = await User.destroy({
//             where: { id: parseInt(id) },
//             returning: true
//         });

//         if (result[0] === 0) {
//             return next(new ErrorHandler("Employee not found", 404));
//         }

//         res.status(200).json({
//             message: "Employee deleted successfully",
//             count: result[0]
//         });
//     } catch (err) {
//         console.error(err);
//         next(new ErrorHandler("An error occurred while deleting the employee", 500));
//     }
// });