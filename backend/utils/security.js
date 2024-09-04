// Can return either :
// null, if not loged in
// the role argument of the cookie

import { SECRET_KEY } from "../config/secrets.js";
import jwt from "jsonwebtoken";

export function getRole(req) {
    if (!req.cookies.token)
        return null
    var cookie = req.cookies.token;
    const decoded = jwt.verify(cookie, SECRET_KEY);
    if (!decoded)
        return null;
    return decoded.role;
}