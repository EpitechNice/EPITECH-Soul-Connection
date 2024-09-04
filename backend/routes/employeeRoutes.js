import express from "express"
import { getEmployees, getEmployeeDetails } from "../controllers/employeeController.js"


const router = express.Router();

router.route("/employees").get(getEmployees);
// router.route("/employees/login").post();
// router.route("/employees/me").get();
router.route("/employees/:id").get(getEmployeeDetails);
// router.route("/employees/:id/image").get();

// router.route("/employees/:id").put();
// router.route("/employees/:id").delete();

export default router;