import express from "express"
import { getCustomers, getCustomerDetails, getCustomerImg, getCustomerPayments, getCustomerClothes, createCustomer, updateCustomer, deleteCustomer } from "../controllers/customerController.js"
import { isAuth, authorizeRoles } from "../middlewares/userAuthentication.js";
import { employeeType } from "../models/employeeModel.js";


const router = express.Router();

router.route("/customers").get(isAuth, getCustomers);
router.route("/customers/:id").get(isAuth, getCustomerDetails);
router.route("/customers/:id/image").get(isAuth, getCustomerImg);
router.route("/customers/:id/payments_history").get(isAuth, getCustomerPayments);
router.route("/customers/:id/clothes").get(isAuth, getCustomerClothes);

router.route("/customers").post(isAuth, authorizeRoles(employeeType.MANAGER), createCustomer);
router.route("/customers/:id").put(isAuth, authorizeRoles(employeeType.MANAGER), updateCustomer);
router.route("/customers/:id").delete(isAuth, authorizeRoles(employeeType.MANAGER), deleteCustomer);

export default router;