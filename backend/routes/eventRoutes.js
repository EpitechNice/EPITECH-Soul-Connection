import express from "express"
import { getEvents, getEventDetails, createEvent, updateEvent, deleteEvent } from "../controllers/eventController.js"
import { isAuth, authorizeRoles } from "../middlewares/userAuthentication.js";

const router = express.Router();

router.route("/events").get(isAuth, getEvents);
router.route("/events/:id").get(isAuth, getEventDetails);

router.route("/events").post(isAuth, authorizeRoles("Manager"), createEvent);
router.route("/events/:id").put(isAuth, authorizeRoles("Manager"), updateEvent);
router.route("/events/:id").delete(isAuth, authorizeRoles("Manager"), deleteEvent);

export default router;