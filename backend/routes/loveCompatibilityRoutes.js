import express from "express"
import { isAuth } from "../middlewares/userAuthentication.js";
import { getCustomers } from "../controllers/customerController.js";

const router = express.Router();

router.route("/love-compatibility").get(isAuth, getCustomers);


export default router;