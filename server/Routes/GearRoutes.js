import express from "express";
import { authMiddleware } from "../Utils/authMiddleware.js";
import {
  createGear,
  getGearByClosetId,
  getGearByOwner,
} from "../Controllers/GearController.js";

const router = express.Router();

router.route("/").post(authMiddleware, createGear);
router.route("/user/:userid").get(authMiddleware, getGearByOwner);

export default router;
