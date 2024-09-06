import express from "express"
import { getEmployees, getEmployeeDetails, loginEmployee, getEmployeeProfile, getEmployeeImg, createEmployee } from "../controllers/employeeController.js"
import { isAuth, authorizeRoles } from "../middlewares/userAuthentication.js";

const router = express.Router();

router.route("/employees").get(isAuth, authorizeRoles("Manager"), getEmployees);
router.route("/employees/login").post(loginEmployee);
router.route("/employees/me").get(isAuth, getEmployeeProfile);
router.route("/employees/:id").get(isAuth, authorizeRoles("Manager") , getEmployeeDetails);
router.route("/employees/:id/image").get(isAuth, authorizeRoles("Manager"), getEmployeeImg);

router.route("/employees").post(isAuth, authorizeRoles("Manager", createEmployee));
router.route("/employees").put(isAuth, authorizeRoles("Manager", updateEmployee));
router.route("/employees").delete(isAuth, authorizeRoles("Manager"));


export default router;