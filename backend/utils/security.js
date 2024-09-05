// Can return either :
// null, if not loged in
// the role argument of the cookie

import { SECRET_KEY } from "../config/secrets.js";
import jwt from "jsonwebtoken";

export const isAuth = catchAsyncErrors(async (req, res, next) => {
    if (!req.cookies.token)
        return next(new ErrorHandler("Node weird refuse", 401));
    var cookie = req.cookies.token;
    const decoded = jwt.verify(cookie, SECRET_KEY);
    if (!decoded)
        return next(new ErrorHandler("Node weird refuse", 401));

    req.user = await User.findById(decoded.id);
    next();
});