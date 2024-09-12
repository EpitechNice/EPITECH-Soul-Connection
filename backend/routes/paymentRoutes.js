import express from "express"
import { getPayments, getPaymentsByCustomer, createPayment, updatePayment, deletePayment } from "../controllers/paymentController.js"
import { isAuth, authorizeRoles } from "../middlewares/userAuthentication.js";
import { employeeType } from "../models/employeeModel.js";

const router = express.Router();

router.route("/payments").get(isAuth, getPayments);
router.route("/customer/:id/payments").get(isAuth, getPaymentsByCustomer);

router.route("/payments").post(isAuth, authorizeRoles(employeeType.MANAGER), createPayment);
router.route("/payments/:id").put(isAuth, authorizeRoles(employeeType.MANAGER), updatePayment);
router.route("/payments/:id").delete(isAuth, authorizeRoles(employeeType.MANAGER), deletePayment);

export default router;