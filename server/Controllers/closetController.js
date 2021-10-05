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

  const { closetName, specs } = req.body;

  const names = user.closets.map((c) => c.closetName);
  if (names.includes(closetName)) {
    res.status(400).json({
      Success: false,
      Error: `Closet already exists with name \'${closetName}\' for user ${user.firstName}`,
    });
  } else {
    const closet_id = new uuidv4();

    const closet = { closetName, specs, contents: [], closet_id };

    user.closets.push(closet);
    await user.save();

    res.status(203).json({
      Success: true,
      Message: `New closet, ${closetName}, added to user with id ${user._id}`,
      user,
    });
  }
});

// @desc          Update closet details (ie. name or specs)
// @route         PUT /api/closets/:id/update/:closetId
const updateClosetDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  // handle no user found
  if (!user) {
    res.status(404).json({
      Success: false,
      Error: `No user with id ${req.params.id}`,
    });
  }

  const { closetName, specs } = req.body;

  // make sure they aren't trying to create an issue with duplicated names
  if (closetName === "All Gear") {
    if (req.params.closetId != user.closets[0]._id) {
      res.status(400).json({
        Success: false,
        Error: `Closet already exists with name \'${closetName}\' for user ${user.firstName}`,
      });
      return;
    }
  } else {
    const names = user.closets.map((c) => c.closetName);
    if (names.includes(closetName)) {
      res.status(400).json({
        Success: false,
        Error: `Closet already exists with name \'${closetName}\' for user ${user.firstName}`,
      });
      return;
    }
  }

  let closetIndex;
  for (let i = 0; i < user.closets.length; i++) {
    if (user.closets[i]._id == req.params.closetId) {
      closetIndex = i;
      break;
    }
  }

  if (typeof closetIndex !== "number") {
    res.status(404).json({
      Success: false,
      Error: `No closet found with closetID ${req.params.closetId}`,
    });
    return;
  }

  // can't change default closet name but we will enforce that on the front end
  user.closets[closetIndex].closetName = closetName;
  user.closets[closetIndex].specs = specs;

  await user.save();

  res.status(203).json({
    Success: true,
    Message: `Closet with closet_id ${req.params.closetId} updated`,
    user,
  });
});

// @desc          Add existing gear to existing closet
// @route         PUT /api/closets/:id/add/:closetId
const addToCloset = asyncHandler(async (updateType, update) => {});

// @desc          Remove gear from closet (but don't delete gear -> unless in all gear
// @route         PUT /api/closets/:id/remove/:closetId
const removeFromCloset = asyncHandler(async (updateType, update) => {});

// @desc        Delete a closet
// @route        Delete /api/closet/:id/delete/:closetId
const deleteCloset = asyncHandler(async (req, res) => {});

export {
  createCloset,
  updateClosetDetails,
  addToCloset,
  removeFromCloset,
  deleteCloset,
};
