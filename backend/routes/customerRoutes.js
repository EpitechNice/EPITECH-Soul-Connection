import express from "express"
import { getCustomers } from "../controllers/customersController.js"
import { isAuth, authorizeRoles } from "../middlewares/userAuthentication.js";


const router = express.Router();

router.route("/customers").get(isAuth, getCustomers);
// router.route("/customers/:id").get();
// router.route("/customers/:id/image").get();
// router.route("/customers/:id/payments_history").get();
// router.route("/customers/:id/clothes").get();


export default router;