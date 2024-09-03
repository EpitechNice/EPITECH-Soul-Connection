import catchAsyncErrors from "../middleware/catchAsyncErrors";
import User from "../models/userModel.js"

// Create new employee: /api/employee/...
export const createEmployee = catchAsyncErrors(async (req, res) => {
    try {
        const employee = await Employee.create(req.body);

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

// Display all employees: /api/employees
export const getEmployees = catchAsyncErrors(async (req, res, next) => {
    try {
        const employees = await User.findAll();

        res.status(200).json({
            employees,
        });
    } catch (err) {
        console.error(err);
        next(new ErrorHandler("An error occurred while fetching employees", 500));
    }
});



// Get specific employee: /api/employees/:id
export const getEmployeeDetails = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return next(new ErrorHandler("Invalid employee ID", 400));
    }

    try {
        const [employee] = await User.findByPk(id, {
            rejectOnEmpty: true
        });

        if (!employee) {
            return next(new ErrorHandler("Employee not found", 404));
        }

        res.status(200).json({
            employee,
        });
    } catch (err) {
        console.error(err);
        next(new ErrorHandler("An error occurred while fetching the employee details", 500));
    }
});


// Update specific employee: /api/employees/:id
export const updateEmployee = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return next(new ErrorHandler("Invalid employee ID", 400));
    }

    try {
        const [updatedRows, [updatedEmployee]] = await User.update(
            req.body,
            {
                where: { id: parseInt(id) },
                returning: true
            }
        );

        if (updatedRows === 0) {
            return next(new ErrorHandler("Employee not found", 404));
        }

        res.status(200).json({
            message: "Employee updated successfully",
            employee: updatedEmployee[0],
        });
    } catch (err) {
        console.error(err);
        next(new ErrorHandler("An error occurred while updating the employee", 500));
    }
});


// Delete specific employee: /api/employees/:id
export const deleteEmployee = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return next(new ErrorHandler("Invalid employee ID", 400));
    }

    try {
        const result = await User.destroy({
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
