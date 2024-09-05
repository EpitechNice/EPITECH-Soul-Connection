import express from "express"
import { getEmployees, getEmployeeDetails, loginEmployee } from "../controllers/employeeController.js"
import { isAuth, authorizeRoles } from "../middlewares/userAuthentication.js";

const router = express.Router();

router.route("/employees").get(isAuth, authorizeRoles("Manager"), getEmployees);
// router.route("/employees/me").get(isAuth);
router.route("/employees/:id").get(isAuth, authorizeRoles("Manager") , getEmployeeDetails);
// router.route("/employees/:id/image").get(isAuth);
router.route("/employees/login").post(loginEmployee);

// router.route("/employees/:id").put(isAuth, authorizeRoles("Manager"));
// router.route("/employees/:id").delete(isAuth, authorizeRoles("Manager"));

export default router;