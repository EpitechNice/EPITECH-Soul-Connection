import express from "express"
import { createClothing, deleteClothing, getClothes, getClothingImg, updateClothing } from "../controllers/clothingController.js"
import { isAuth } from "../middlewares/userAuthentication.js";


const router = express.Router();

router.route("/clothes/:id/image").get(getClothingImg);
router.route("/clothes").get(getClothes);

router.route("/clothes").post(isAuth, createClothing);
router.route("/clothes/:id").put(isAuth, updateClothing);
router.route("/clothes/:id").delete(isAuth, deleteClothing);

export default router;