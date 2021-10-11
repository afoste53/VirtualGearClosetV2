import express from "express";
import {
  createGear,
  deleteGear,
  editGearDetails,
} from "../Controllers/gearController.js";
import { authMiddleware } from "../Utils/authMiddleware.js";

const router = express.Router();

router.post("/:id", authMiddleware, createGear);
router.delete("/:id/delete/:gearId", authMiddleware, deleteGear);
router.put("/:id/update/:gearId", authMiddleware, editGearDetails);

export default router;
