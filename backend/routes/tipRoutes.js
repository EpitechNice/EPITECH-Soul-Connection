import express from "express"
import { getTips, createTip, updateTip, deleteTip } from "../controllers/tipController.js"
import { isAuth, authorizeRoles } from "../middlewares/userAuthentication.js";


const router = express.Router();

router.route("/tips").get(getTips);

router.route("/tips").post(authorizeRoles("Manager"), createTip);
router.route("/tips/:id").put(authorizeRoles("Manager"), updateTip);
router.route("/tips/:id").delete(authorizeRoles("Manager"), deleteTip);

export default router;