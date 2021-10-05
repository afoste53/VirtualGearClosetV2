import asyncHandler from "express-async-handler";
import User from "../Models/UserModel.js";
import { v4 as uuidv4 } from "uuid";

// @desc        Create a new closet
// @route        POST /api/closet/:id
const createCloset = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  // handle no user found
  if (!user) {
    res.status(404).json({
      Success: false,
      Error: `No user with id ${req.params.id}`,
    });
  }

  const { closetName, specs, contents } = req.body;

  const closet = { closetName, specs, contents, closet_id: new uuidv4() };

  user.closets.push(closet);

  await user.save();

  res.status(203).json({
    Success: true,
    Message: `New closet ${closetName} added to user with id ${user._id}`,
    user,
  });
});

// @desc
// @route
const updateCloset = asyncHandler(async (updateType, update) => {});

// @desc        Delete a closet
// @route        Delete /api/closet/:id
const deleteCloset = asyncHandler(async (req, res) => {});

export { createCloset, updateCloset, deleteCloset };
