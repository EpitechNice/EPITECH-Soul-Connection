import express from "express"
import { getEmployees } from "../controllers/employeeController.js"
// import { isAuth, authorizeRoles } from "../middlewares/userAuthentication.js";

const router = express.Router();

router.route("/employees").get(getEmployees);
// router.route("/employees").get(isAuth, authorizeRoles("Manager"), getEmployees);


export default router;