import express from "express"
import { getClothing, getClothingImg } from "../controllers/clothesController.js"
import { isAuth } from "../middlewares/userAuthentication.js";


const router = express.Router();

router.route("/clothes/:id/image").get(isAuth, getClothesImg);
router.route("/clothes").get(isAuth, getClothes);


export default router;