import asyncHandler from "express-async-handler";
import { verifyUserExists } from "./userController.js";
import { v4 as uuidv4 } from "uuid";

// @desc        Create a new closet
// @route        POST /api/closet/:id
const createCloset = asyncHandler(async (req, res) => {
  const user = await verifyUserExists(req.params.id, res);

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
  const user = await verifyUserExists(req.params.id, res);

  const { closetName, specs } = req.body;

  /* make sure they aren't trying to create an issue with closet naming rules
   * 1) only default closet can be named all gear
   * 2) cannot change name of default closet
   *
   *  incoming name = All Gear && incoming id points to all gear => good
   *  incoming name = All Gear && incoming id !points to all gear => 'All Gear already exists' res
   *
   *  incoming name != All Gear && incoming id points to all gear => "can't change default closet name" res
   *  incoming name != All Gear && incoming id !points to all gear => good
   * */

  let agId = user.closets
    .filter((c) => c.closetName == "All Gear")
    .map((c) => c._id)[0];

  if (closetName === "All Gear") {
    if (req.params.closetId != agId) {
      res.status(400).json({
        Success: false,
        Error: "Only the default closet can be named 'All Gear'",
      });
      return;
    }
  } else {
    if (req.params.closetId == agId) {
      res.status(400).json({
        Success: false,
        Error: "Cannot change the name of the default closet",
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
const addToCloset = asyncHandler(async (req, res) => {
  const user = await verifyUserExists(req.params.id, res);

  let closetIndex;

  for (let i = 0; i < user.closets.length; i++) {
    if (user.closets[i]._id == req.params.closetId) {
      closetIndex = i;
      break;
    }
  }

  // does closet exists?
  if (!closetIndex) {
    res.status(404).json({
      Success: false,
      Error: `No closet found for user ${user.firstName} with id ${req.params.closetId}`,
    });
  }

  // add reference to closet to each gear item's closet list
  req.body.gearToAdd.forEach((g) => {
    g.closets.push(req.params.closetId);
  });

  req.body.gearToAdd.forEach((g) => {
    user.closets[closetIndex].push(g);
  });

  res.status(203).json({
    Success: true,
    Message: `Gear successfully added to closet with closetId ${req.params.closetId}`,
    user,
  });
});

// @desc          Remove gear from closet (but don't delete gear -> unless in all gear
// @route         PUT /api/closets/:id/remove/:closetId
const removeFromCloset = asyncHandler(async (updateType, update) => {});

// @desc        Delete a closet
// @route       DELETE /api/closet/:id/delete/:closetId
const deleteCloset = asyncHandler(async (req, res) => {
  const user = await verifyUserExists(req.params.id, res);

  const closet = user.closets.filter((c) => c._id == req.params.closetId);

  const gear = closet.map((c) => c.contents);
});

export {
  createCloset,
  updateClosetDetails,
  addToCloset,
  removeFromCloset,
  deleteCloset,
};
