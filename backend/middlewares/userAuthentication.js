import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import Customer from "../models/customerModel.js";

//Check if user is auth
export const isAuth = catchAsyncErrors(async (req, res, next) => {
    if (!req.cookies.token)
        return next(new ErrorHandler("Login required to access this resource", 401));

    var cookie = req.cookies.token;
    const decoded = jwt.verify(cookie, process.env.JWT_SECRET);

    if (!decoded)
        return next(new ErrorHandler("Node weird refuse", 401));

    req.user = await Customer.findByPk(decoded.id);
    next();
});

export const authorizeRoles = (...types) => {
    return (req, res, next) => {
        if (!types.includes(req.user.type)) {
            return next(new ErrorHandler(`Role '${req.user.type}' is not allowed to access this ressource`, 403));
        }
        next();
    }

};