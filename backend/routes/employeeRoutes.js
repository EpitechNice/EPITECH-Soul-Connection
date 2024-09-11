import express from "express"
import { getEmployees, getEmployeeDetails, loginEmployee, logoutEmployee, createEmployee, getEmployeeProfile, getEmployeeImg, updateEmployee, deleteEmployee } from "../controllers/employeeController.js"
import { isAuth, authorizeRoles } from "../middlewares/userAuthentication.js";
import { employeeType } from "../models/employeeModel.js";


const router = express.Router();

router.route("/employees").get(isAuth, getEmployees);
router.route("/employees/login").post(loginEmployee);
router.route("/logout").get(logoutEmployee);
router.route("/employees/me").get(isAuth, getEmployeeProfile);
router.route("/employees/:id").get(isAuth, getEmployeeDetails);
router.route("/employees/:id/image").get(isAuth, getEmployeeImg);

router.route("/employees").post(isAuth, authorizeRoles(employeeType.MANAGER), createEmployee);
router.route("/employees/:id").put(isAuth, authorizeRoles(employeeType.MANAGER), updateEmployee);
router.route("/employees/:id").delete(isAuth, authorizeRoles(employeeType.MANAGER), deleteEmployee);

export default router;