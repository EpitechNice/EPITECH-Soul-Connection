import Employee from "../models/employeeModel.js";

import { hashSync, genSaltSync } from "bcrypt";

const password = hashSync(process.env.REMOTE_API_PASSW, genSaltSync(10));

Employee.update(
    { password: password, },
    { where: { email: process.env.REMOTE_API_EMAIL } });