import express from "express";
import { createCloset } from "../controllers/closetController.js";
import { authMiddleware } from "../Utils/authMiddleware.js";

const router = express.Router();

router.route("/").post(authMiddleware, createCloset);

export default router;
