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
const deleteGear = asyncHandler(async (req, res) => {
  const user = await verifyUserExists(req.params.id, res);

  const gearId = req.params.gearId;
  const g = user.gear.find((c) => c.gear_id == gearId);

  if (!g) {
    res.status(404).json({
      Success: false,
      Error: `No gear found with id ${gearId}`,
    });
    return;
  }

  // walk through closet array of the gear we are trying to delete
  // for each closetId in there, go find them on the user object and
  // filter the gearId of what we need to remove out of the gearInCloset
  // array
  g.closets.forEach((c) => {
    let curr = user.closets.filter((i) => c.toString() == i._id.toString())[0];
    curr.gearInCloset = curr.gearInCloset.filter(
      (j) => j.toString() !== gearId.toString()
    );
  });

  // remove the gear item from the users array of gear
  user.gear = user.gear.filter((g) => g.gear_id != gearId);

  await user.save();
  res.status(202).json({
    Success: true,
    Message: `${g.gearName} has been deleted`,
    user,
  });
});

// @desc        Update a piece of gear
// @route       PUT /api/gear/:id/update/:gearId
const editGearDetails = asyncHandler(async (req, res) => {});

export { createGear, deleteGear, editGearDetails };
