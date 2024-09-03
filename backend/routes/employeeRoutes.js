import express from "express"

import { getEmployee } from employeeController.js


const router = express.Router();

router.route("/employees").get();

export default router;