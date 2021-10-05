import express from "express";
import {
  createCloset,
  updateClosetDetails,
  addToCloset,
  removeFromCloset,
  deleteCloset,
} from "../Controllers/closetController.js";
import { authMiddleware } from "../Utils/authMiddleware.js";

const router = express.Router();

router.post("/:id", authMiddleware, createCloset);
router.put("/:id/update/:closetId", authMiddleware, updateClosetDetails);
router.put("/:id/add/:closetId", authMiddleware, addToCloset);
router.put("/:id/remove/:closetId", authMiddleware, removeFromCloset);
router.delete("/:id/delete/:closetId", authMiddleware, deleteCloset);

export default router;
