import express from "express"
import { getEmployees } from "../controllers/employeeController.js"


const router = express.Router();

router.route("employees").get(getEmployees);


export default router;