import express from "express"
import { getClothes, getClothingImg } from "../controllers/clothingController.js"
import { isAuth } from "../middlewares/userAuthentication.js";


const router = express.Router();

router.route("/clothes/:id/image").get(getClothingImg);
router.route("/clothes").get(getClothes);


export default router;