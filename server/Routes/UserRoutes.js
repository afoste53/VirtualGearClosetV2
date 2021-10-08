import express from "express";
import {
  authUser,
  createUser,
  deleteUser,
  getUserById,
  getAllUsers,
  updateUserDetails,
  changePassword,
} from "../Controllers/userController.js";
import { authMiddleware } from "../Utils/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);
router.route("/").get(getAllUsers).post(createUser);
router
  .route("/:id")
  .get(authMiddleware, getUserById)
  .put(authMiddleware, updateUserDetails)
  .delete(authMiddleware, deleteUser);
router.put("/:id/password", authMiddleware, changePassword);

export default router;
