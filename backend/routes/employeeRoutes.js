import express from "express"
import { getEmployees, loginEmployee } from "../controllers/employeeController.js"


const router = express.Router();

router.route("/employees").get(getEmployees);
router.route("/employees/login").post(loginEmployee);

export default router;