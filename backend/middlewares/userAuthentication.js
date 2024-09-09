import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import User from "../models/userModel.js";

//Check if user is auth
export const isAuth = catchAsyncErrors(async (req, res, next) => {
    if (!req.cookies.token)
        return next(new ErrorHandler("Login required to access this resource", 401));
    var cookie = req.cookies.token;
    const decoded = jwt.verify(cookie, process.env.SECRET_KEY);
    if (!decoded)
        return next(new ErrorHandler("Node weird refuse", 401));

    req.user = await User.findById(decoded.id);
    next();
});