import express from "express"
import { getEmployees, loginEmployee, verifyLoginExample } from "../controllers/employeeController.js"


const router = express.Router();

router.route("/employees").get(getEmployees);
router.route("/employees/login").post(loginEmployee);

router.route("/employees/check_logged_in").get(verifyLoginExample);

export default router;