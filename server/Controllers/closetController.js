import Closet from "../Models/ClosetModel.js";
import User from "../Models/UserModel.js";
import asyncHandler from "express-async-handler";

// @desc        Create new closet
// @route       POST /api/closets/
const createCloset = asyncHandler(async (req, res) => {
  const { name, gear, owner } = req.body;

  const closet = await Closet.create({
    name,
    gear,
    owner,
  });

  if (closet) {
    const user = await User.findById(owner);

    user.closets.push(closet._id);
    await user.save();

    res.status(201).json({
      Success: true,
      closet,
    });
  } else {
    const error = "Invalid closet data";

    res.status(400).json({
      Success: false,
      Error: error,
    });
    throw new Error(error);
  }
});

export { createCloset };
