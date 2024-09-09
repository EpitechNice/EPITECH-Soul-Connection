import express from "express"
import { getEmployees, getEmployeeDetails, loginEmployee, createEmployee } from "../controllers/employeeController.js"
import { isAuth, authorizeRoles } from "../middlewares/userAuthentication.js";


const router = express.Router();

router.route("/employees").get(isAuth, getEmployees);
// router.route("/employees/me").get();
router.route("/employees/:id").get(isAuth, getEmployeeDetails);
// router.route("/employees/:id/image").get();
router.route("/employees/login").post(loginEmployee);

router.route("/employees").post(isAuth, authorizeRoles("Manager"), createEmployee);
// router.route("/employees/:id").put();
// router.route("/employees/:id").delete();

export default router;