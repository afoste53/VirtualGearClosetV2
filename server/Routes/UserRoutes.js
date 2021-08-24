import express from "express";
import {
  authUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", authUser);
router.route("/").post(createUser);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

export default router;
