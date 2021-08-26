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

// @desc      Get all closets
// @route     GET /api/closets/
const getAllClosets = asyncHandler(async (req, res) => {
  const closets = await Closet.find();

  if (closets) {
    res.status(200).json({
      Success: true,
      closets,
    });
  } else {
    const error = "Unable to fetch all closets";

    res.status(400).json({
      Success: false,
      Error: error,
    });

    throw new Error(error);
  }
});

// @desc      Get closets by owner Id
// @route     GET /api/closets/owner/:ownerId
const getClosetsByOwner = asyncHandler(async (req, res) => {
  const closets = await Closet.find({ owner: req.params.ownerId });

  if (closets) {
    res.status(200).json({
      Success: true,
      closets,
    });
  } else {
    const error = `No closets found owned by ownerId ${req.params.ownerId}`;

    res.status(400).json({
      Success: false,
      Error: error,
    });
    throw new Error(error);
  }
});

// @desc      Get closet by :id
// @route     GET /api/closets/:id
const getClosetById = asyncHandler(async (req, res) => {
  const closet = await Closet.findById(req.params.id);

  if (closet) {
    res.status(200).json({
      Success: true,
      closet,
    });
  } else {
    res.status(404).json({
      Success: false,
      Error: `No closet found with id ${req.params.id}`,
    });
  }
});

// @desc      Edit closet
// @route     PUT /api/closets/:id/name
const editClosetName = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const closet = await Closet.findOneAndUpdate(
    { _id: req.params.id },
    { name },
    { new: true }
  );

  if (closet) {
    res.status(200).json({
      Success: true,
      closet,
    });
  } else {
    res.status(400).json({
      Success: false,
      Error: `Failed to update closet with id ${req.params.id}`,
    });
  }
});

export {
  createCloset,
  getClosetsByOwner,
  getAllClosets,
  getClosetById,
  editClosetName,
};
