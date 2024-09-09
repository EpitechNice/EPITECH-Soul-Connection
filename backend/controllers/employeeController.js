import jwt from "jsonwebtoken";
import { compareSync } from "bcrypt";
import User from "../models/userModel.js"
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js"
import { isEmail } from "../utils/typeValidator.js";
import { randint } from "../utils/random.js";

// Display all employees: /api/employees
export const getEmployees = catchAsyncErrors(async (req, res, next) => {
    try {
        const employees = await User.findAll({
            attributes: ['id', 'email', 'name', 'surname']
        });

        res.status(200).json({
            employees,
        });
    } catch (err) {
        console.error(err);
        next(new ErrorHandler("An error occurred while fetching employees", 500));
    }
});

//TODO: to test
// Display employee profile: /api/employees/me
export const getEmployeeProfile = catchAsyncErrors(async (req, res, next) => {
    try {
        const employee = await User.findByPk(req?.user?.id);

        if (!employee) {
            return next(new ErrorHandler(`Employee not found`, 404));
        }

        const filteredEmployee = {
            id: employee.id,
            email: employee.email,
            name: employee.name,
            surname: employee.surname,
            birth_date: employee.birth_date,
            gender: employee.gender,
            work: employee.work
        };

        res.status(200).json({
            employee: filteredEmployee,
        });
    } catch (err) {
        console.error(err);
        next(new ErrorHandler("An error occurred while fetching the employee profile", 500));
    }
});

//TODO: to test (missing 422 Validation Error)
// Get specific employee: /api/employees/:id
export const getEmployeeDetails = catchAsyncErrors(async (req, res, next) => {
    const employee = await User.findByPk(req.params.id);

    if (!employee) {
        return next(new ErrorHandler("Employee requested doesn't exist", 404));
    }

    const filteredEmployee = {
        id: employee.id,
        email: employee.email,
        name: employee.name,
        surname: employee.surname,
        birth_date: employee.birth_date,
        gender: employee.gender,
        work: employee.work
    };

    res.status(200).json({
        employee: filteredEmployee,
    });
});

//TODO: to test (missing 422 Validation Error, image by default in front if no image)
// Get specific employee: /api/employees/:id/image
export const getEmployeeImg = catchAsyncErrors(async (req, res, next) => {
    const employee = await User.findByPk(req.params.id);

    if (!employee) {
        return next(new ErrorHandler("Employee requested doesn't exist", 404));
    }

    const employeeImg = employee.image_path;

    res.status(200).json({
        employeeImg,
    });
});

// // Create new employee: /api/employee/...
// export const createEmployee = catchAsyncErrors(async (req, res) => {
//     try {
//         const employee = await User.create(req.body);

//         res.status(201).json({
//             message: "New employee created successfully",
//             employee,
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(400).json({
//             error: "Failed to create employee",
//             details: err.message
//         });
//     }
// });

// // Update specific employee: /api/employees/:id
// export const updateEmployee = catchAsyncErrors(async (req, res, next) => {
//     const id = req.params;

//     if (!id || isNaN(id)) {
//         return next(new ErrorHandler("Invalid employee ID", 400));
//     }

//     try {
//         const [updatedRows, [updatedEmployee]] = await User.update(
//             req.body,
//             {
//                 where: { id: parseInt(id) },
//                 returning: true
//             }
//         );

//         if (updatedRows === 0) {
//             return next(new ErrorHandler("Employee not found", 404));
//         }

//         res.status(200).json({
//             message: "Employee updated successfully",
//             employee: updatedEmployee[0],
//         });
//     } catch (err) {
//         console.error(err);
//         next(new ErrorHandler("An error occurred while updating the employee", 500));
//     }
// });


// // Delete specific employee: /api/employees/:id
// export const deleteEmployee = catchAsyncErrors(async (req, res, next) => {
//     const id = req.params;

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

export const loginEmployee = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!isEmail(email))
        return next(new ErrorHandler("Invalid email/password", (randint(0, 100) == 0 ? 418 : 400)));

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
        return next(new ErrorHandler("Invalid email/password", (randint(0, 100) == 0 ? 418 : 400)));

    const token = jwt.sign({
        id: luser.id,
        email: luser.email,
        role: luser.type,
        name: luser.name,
        surname: luser.surname,
    },
    process.env.SECRET_KEY,
    {
        expiresIn: 3 * 7 * 24 * 60 * 60,
    });

    res.cookie("token", token);
    res.status(200).send("Nice negga");
})