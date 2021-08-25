import Gear from "../Models/GearModel.js";
import asyncHandler from "express-async-handler";

// @desc        Create a new piece of gear
// @route       POST /api/gear/
const createGear = asyncHandler(async (req, res) => {
  const { name, weight, color, notes, cost, quantity, brand, owner, closets } =
    req.body;

  const gear = await Gear.create({
    name,
    weight,
    color,
    notes,
    cost,
    quantity,
    brand,
    owner,
    closets,
  });

  if (gear) {
    // get closets where owner === owner, and name === "All Gear"
    const ownersCloset = await Closet.updateOne(
      { owner: { $eq: owner }, name: { $eq: "All Gear" } },
      {
        $push: {
          closets: { name, item: gear._id },
        },
      }
    );

    console.log(ownersCloset);

    if (ownersCloset) {
      res.status(201).json({
        Success: true,
        gear,
      });
    }
  } else {
    const error = "Invalid gear data";

    res.status(400).json({
      Success: false,
      Error: error,
    });
    throw new Error(error);
  }
});

// @desc        Get all gear in a given closet
// @route       GET /api/gear/closet/:closetId
const getGearByClosetId = asyncHandler(async (req, res) => {});

// @desc        Get gear by user
//              (get contents of closet "all gear" for user)
// @route       GET /api/gear/user/:userId
const getGearByOwner = asyncHandler(async (req, res) => {
  const gearByOwner = Gear.find().where(owner).equals(req.params.userId);

  if (gearByOwner) {
    res.status(200).json({
      Success: true,
      gearByOwner,
    });
  } else {
    const error = "Invalid user data provided";

    res.status(400).json({
      Success: false,
      Error: error,
    });
    throw new Error(error);
  }
});

/**rs
// @desc        Get gear by id
// @route       GET /api/gear/:id
const getGearByClosetId = asyncHandler(async (req, res) => {});

// @desc        Edit gear item details
// @route       PUT /api/gear/:id
const getGearByClosetId = asyncHandler(async (req, res) => {
check for user
});

// @desc        Delete gear
// @route       DELETE /api/gear/:id
const getGearByClosetId = asyncHandler(async (req, res) => {
check for user
});
**/
export { createGear, getGearByClosetId, getGearByOwner };
