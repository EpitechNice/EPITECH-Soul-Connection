import express from "express"
import { getEmployees } from "../controllers/employeeController.js"


const router = express.Router();

router.route("/customers").get(getCustomers);
// router.route("/customers/:id").get();
// router.route("/customers/:id/image").get();
// router.route("/customers/:id/payments_history").get();
// router.route("/customers/:id/clothes").get();


export default router;