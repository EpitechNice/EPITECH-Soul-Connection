import express from "express"
import { getClothes, getClothesImg } from "../controllers/clothesController.js"
import { isAuth, authorizeRoles } from "../middlewares/userAuthentication.js";


const router = express.Router();

router.route("/clothes/:id/image").get(isAuth, getClothesImg);
router.route("/wardrobe").get(isAuth, getClothes);


export default router;