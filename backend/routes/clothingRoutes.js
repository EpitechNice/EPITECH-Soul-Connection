import express from "express"
import { createClothing, deleteClothing, getClothes, getClothingImg, updateClothing } from "../controllers/clothingController.js"
import { isAuth, authorizeRoles } from "../middlewares/userAuthentication.js";
import { employeeType } from "../models/employeeModel.js";

const router = express.Router();

router.route("/clothes").get(isAuth, getClothes);
router.route("/clothes/:id/image").get(isAuth, getClothingImg);

router.route("/clothes").post(isAuth, authorizeRoles(employeeType.MANAGER), createClothing);
router.route("/clothes/:id").put(isAuth, authorizeRoles(employeeType.MANAGER), updateClothing);
router.route("/clothes/:id").delete(isAuth, authorizeRoles(employeeType.MANAGER), deleteClothing);

export default router;