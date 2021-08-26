import express from "express";
import {
  createCloset,
  getAllClosets,
  getClosetsByOwner,
  getClosetById,
  editClosetName,
} from "../controllers/closetController.js";
import { authMiddleware } from "../Utils/authMiddleware.js";

const router = express.Router();

router.route("/").post(authMiddleware, createCloset).get(getAllClosets);
router.route("/owner/:ownerId").get(authMiddleware, getClosetsByOwner);
router.route("/:id").get(authMiddleware, getClosetById);
router.route("/:id/name").put(editClosetName);

export default router;
