import express from "express"
import { createEncounter, deleteEncounter, getEncounters, getEncounter, updateEncounter } from "../controllers/encounterController.js"
import { isAuth, authorizeRoles } from "../middlewares/userAuthentication.js";
import { employeeType } from "../models/employeeModel.js";

const router = express.Router();

router.route("/encounters").get(isAuth, getEncounters);
router.route("/encounters/:id").get(isAuth, getEncounter);

router.route("/encounters").post(isAuth, authorizeRoles(employeeType.MANAGER), createEncounter);
router.route("/encounters/:id").put(isAuth, authorizeRoles(employeeType.MANAGER), updateEncounter);
router.route("/encounters/:id").delete(isAuth, authorizeRoles(employeeType.MANAGER), deleteEncounter);

export default router;