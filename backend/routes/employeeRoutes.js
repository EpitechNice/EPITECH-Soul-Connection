import express from "express"

import getEmployee from "../controllers/employeeController.js"


const router = express.Router();

router.route("employees").get(getEmployee);





export default router;