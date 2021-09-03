import Closet from "../Models/ClosetModel.js";
import User from "../Models/UserModel.js";
import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";

// @desc        Create new closet
// @route       POST /api/closets/
const createCloset = asyncHandler(async (req, res) => {
  const { name, gear, owner } = req.body;

  if (gear) {
    gear.forEach((g) => {
      g.id = uuidv4();
    });
  }

  const closet = await Closet.create({
    name,
    gear,
    owner,
  });

  if (closet) {
    const user = await User.findById(owner);

    user.closets.push(closet._id);
    await user.save();

    const defaultCloset = await Closet.findOne({
      owner: { $eq: owner },
      name: { $eq: "All Gear" },
    });

    defaultCloset.addGearToCloset(gear);
    await defaultCloset.save();

    res.status(201).json({
      Success: true,
      closet,
    });
  } else {
    res.status(400).json({
      Success: false,
      Error: "Invalid closet data",
    });
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
    res.status(400).json({
      Success: false,
      Error: "Unable to fetch all closets",
    });
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
    res.status(404).json({
      Success: false,
      Error: `No closets found owned by ownerId ${req.params.ownerId}`,
    });
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

  // fetch closet and check if it is "All Gear"
  const closet = await Closet.findOne({ _id: req.params.id });
  if (closet?.name === "All Gear") {
    res.status(400).json({
      Success: false,
      Error: "Cannot change name of default closet",
    });
  } else {
    if (closet) {
      closet.name = name;
      await closet.save();

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
  }
});

// @desc        Add gear to a closet given by ClosetId
// @route       PUT /api/gear/:id/add
const addGearToCloset = asyncHandler(async (req, res) => {
  const { gearToAdd } = req.body;

  // fetch closet that gear needs to be added to
  const closet = await Closet.findById(req.params.id);

  if (!closet) {
    res.status(404).json({
      Success: false,
      Error: `No closet found with id ${req.params.id}`,
    });
  } else {
    const { owner } = closet;

    // add ids to each gear item
    gearToAdd.forEach((g) => {
      g.id = uuidv4();
    });

    // Check if it's the default closet and add gear
    // to it default closet as well if so
    if (closet.name != "All Gear") {
      const defaultCloset = await Closet.findOne({
        owner: { $eq: owner },
        name: { $eq: "All Gear" },
      });

      defaultCloset.addGearToCloset(gearToAdd);
      closet.addGearToCloset(gearToAdd);

      await defaultCloset.save();
      await closet.save();
    } else {
      // o/w push onto closet only
      closet.addGearToCloset(gearToAdd);

      await closet.save();
    }

    res.status(203).json({
      Success: true,
      closet,
    });
  }
});

// @desc        Remove gear to a closet given by ClosetId
// @route       PUT /api/gear/:id/remove
const removeGearFromCloset = asyncHandler(async (req, res) => {
  const { gearToRemove } = req.body;

  // fetch closet that gear needs to be added to
  const closet = await Closet.findById(req.params.id);
  if (!closet) {
    res.status(404).json({
      Success: false,
      Error: `No closet found with id ${req.params.id}`,
    });
  } else {
    const { owner } = closet;

    // Temp variable to hold filtered gear
    let tempDefaultCloset = [];
    let tempCloset = [];

    // Check if it's the default closet and remove gear
    // from it default closet as well if so
    if (closet.name !== "All Gear") {
      const defaultCloset = await Closet.findOne({
        owner: { $eq: owner },
        name: { $eq: "All Gear" },
      });

      // Filter gear out of each closet
      gearToRemove.forEach((g) => {
        defaultCloset.gear.forEach((c) => {
          if (g.id != c.id) tempDefaultCloset.push(c);
        });

        closet.gear.forEach((c) => {
          if (g.id != c.id) tempCloset.push(c);
        });
      });

      defaultCloset.gear = tempDefaultCloset;
      await defaultCloset.save();

      closet.gear = tempCloset;
      await closet.save();
    } else {
      // Filter gear out of each closet
      gearToRemove.forEach((g) =>
        closet.gear.forEach((c) => {
          if (g.id != c.id) tempCloset.push(c);
        })
      );

      await closet.save();
    }

    res.status(203).json({
      Success: true,
      closet,
    });
  }
});

export {
  createCloset,
  getClosetsByOwner,
  getAllClosets,
  getClosetById,
  editClosetName,
  addGearToCloset,
  removeGearFromCloset,
};
