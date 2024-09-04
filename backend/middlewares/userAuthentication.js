import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import User from "../models/userModel.js";

//Check if user is auth
export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const {token} = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Login required to access this resource", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
});

export const authorizeRoles = (...types) => {
    return (req, res, next) => {
        if (!types.includes(req.user.role)) {
            return next(new ErrorHandler(`Role '${req.user.type}' is not allowed to access this ressource`, 403));
        }
        next();
    }

};