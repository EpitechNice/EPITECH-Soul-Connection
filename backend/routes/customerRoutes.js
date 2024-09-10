import express from "express"
import { getCustomers, getCustomer, getCustomerImg } from "../controllers/customerController.js"
import { isAuth, authorizeRoles } from "../middlewares/userAuthentication.js";


const router = express.Router();

router.route("/customers").get(isAuth, getCustomers);
router.route("/customers/:id").get(isAuth, getCustomer);
router.route("/customers/:id/image").get(isAuth, getCustomerImg);
// router.route("/customers/:id/payments_history").get();
// router.route("/customers/:id/clothes").get();


export default router;