import express from "express"
import { getTips, createTip, updateTip, deleteTip } from "../controllers/tipController.js"
import { isAuth, authorizeRoles } from "../middlewares/userAuthentication.js";


const router = express.Router();

router.route("/tips").get(isAuth, getTips);
router.route("/tips").post(isAuth, authorizeRoles("Manager"), createTip);
router.route("/tips/:id").put(isAuth, authorizeRoles("Manager"), updateTip);
router.route("/tips/:id").delete(isAuth, authorizeRoles("Manager"), deleteTip);

export default router;