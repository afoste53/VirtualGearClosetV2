import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import { verifyUserExists } from "./userController.js";

// @desc        Create a new piece of gear
// @route       POST /api/gear/:id/
const createGear = asyncHandler(async (req, res) => {
  const user = await verifyUserExists(req.params.id, res);

  const { gearName, specs } = req.body;

  const names = user.gear.map((g) => g.gearName);
  if (names.includes(gearName)) {
    res.status(400).json({
      Success: false,
      Error: `Gear already exists with name \'${gearName}\' for user ${user.firstName}`,
    });
    return;
  } else {
    const gear_id = new mongoose.Types.ObjectId();

    const allGearId = user.closets.find((c) => c.closetName == "All Gear")._id;

    const gear = { gearName, specs, gear_id, closets: [allGearId] };

    user.closets
      .find((c) => c.closetName === "All Gear")
      .gearInCloset.push(gear_id);

    user.gear.push(gear);

    await user.save();

    res.status(203).json({
      Success: true,
      Message: `New gear, with name ${gearName}, added to user with id ${user._id}`,
      user,
    });
  }
});

// @desc        Delete a piece of gear
// @route       DELETE /api/gear/:id/delete/:gearId
const deleteGear = asyncHandler(async (req, res) => {});

// @desc        Update a piece of gear
// @route       PUT /api/gear/:id/update/:gearId
const editGearDetails = asyncHandler(async (req, res) => {});

export { createGear, deleteGear, editGearDetails };
