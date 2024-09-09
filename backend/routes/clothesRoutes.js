import express from "express"
import { getClothing, getClothingImg } from "../controllers/clothesController.js"
import { isAuth } from "../middlewares/userAuthentication.js";


const router = express.Router();

router.route("/clothes/:id/image").get(isAuth, getClothingImg);
router.route("/wardrobe").get(isAuth, getClothing);


export default router;