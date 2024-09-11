import express from "express"
import { getTips, createTip, updateTip, deleteTip } from "../controllers/tipController.js"
import { isAuth, authorizeRoles } from "../middlewares/userAuthentication.js";
import { employeeType } from "../models/employeeModel.js";


const router = express.Router();

router.route("/tips").get(isAuth, getTips);

router.route("/tips").post(isAuth, authorizeRoles(employeeType.MANAGER), createTip);
router.route("/tips/:id").put(isAuth, authorizeRoles(employeeType.MANAGER), updateTip);
router.route("/tips/:id").delete(isAuth, authorizeRoles(employeeType.MANAGER), deleteTip);

export default router;