import express from "express"
import { getEvents, getEventDetails, createEvent, updateEvent, deleteEvent } from "../controllers/eventController.js"
import { isAuth, authorizeRoles } from "../middlewares/userAuthentication.js";
import { employeeType } from "../models/employeeModel.js";

const router = express.Router();

router.route("/events").get(isAuth, getEvents);
router.route("/events/:id").get(isAuth, getEventDetails);

router.route("/events").post(isAuth, authorizeRoles(employeeType.MANAGER), createEvent);
router.route("/events/:id").put(isAuth, authorizeRoles(employeeType.MANAGER), updateEvent);
router.route("/events/:id").delete(isAuth, authorizeRoles(employeeType.MANAGER), deleteEvent);

export default router;