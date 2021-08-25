import express from "express";
import {
  authUser,
  createUser,
  deleteUser,
  getUserById,
  getAllUsers,
  updateUser,
} from "../controllers/userController.js";
import { authMiddleware } from "../Utils/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);
router.route("/").get(getAllUsers).post(createUser);
router
  .route("/:id")
  .get(authMiddleware, getUserById)
  .put(authMiddleware, updateUser)
  .delete(authMiddleware, deleteUser);

export default router;
