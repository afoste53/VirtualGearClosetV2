import express from "express";
import {
  createCloset,
  getAllClosets,
  getClosetsByOwner,
  getClosetById,
  editClosetName,
  addGearToCloset,
  removeGearFromCloset,
} from "../controllers/closetController.js";
import { authMiddleware } from "../Utils/authMiddleware.js";

const router = express.Router();

router.route("/").post(authMiddleware, createCloset).get(getAllClosets);
router.route("/owner/:ownerId").get(authMiddleware, getClosetsByOwner);
router.route("/:id").get(authMiddleware, getClosetById);
router.route("/:id/name").put(authMiddleware, editClosetName);
router.route("/:id/add").put(authMiddleware, addGearToCloset);
router.route("/:id/remove").put(authMiddleware, removeGearFromCloset);

export default router;
