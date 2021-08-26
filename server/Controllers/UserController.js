import User from "../Models/UserModel.js";
import Closet from "../Models/ClosetModel.js";
import generateToken from "../Utils/generateToken.js";
import asyncHandler from "express-async-handler";

// @desc        Auth Users and get token
// @route       POST /api/users/login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      Success: true,
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email,
      closets: user.closets,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({
      Success: false,
      Error: "Invalid credentials",
    });
  }
});

// @desc        Create a new user
// @route       POST /api/users/
const createUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({
      Success: false,
      Error: "User already exists",
    });
  } else {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      closets: [],
    });
    if (user) {
      const defaultCloset = await Closet.create({
        name: "All Gear",
        gear: [],
        owner: user._id,
      });

      if (defaultCloset) {
        user.closets.push(defaultCloset._id);
        await user.save();

        res.status(201).json({
          Success: true,
          _id: user._id,
          firstName,
          lastName,
          email,
          closets: user.closets,
          token: generateToken(user._id),
        });
      } else {
        res.status(400).json({
          Success: false,
          Error: "Invalid user data",
        });
      }
    }
  }
});

// @desc        Get user by id
// @route       GET /api/users/:id
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.status(200).json({
      Success: true,
      user,
    });
  } else {
    res.status(404).json({
      Success: false,
      Error: `User not found with id ${req.params.id}`,
    });
  }
});

// @desc      Get all users
// @route     GET /api/users/
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  if (users) {
    res.status(200).json({
      Success: true,
      users,
    });
  } else {
    res.status(400).json({
      Success: false,
      Error: "Unable to fetch all users",
    });
  }
});

// @desc        Update user by id
// @route       Put /api/users/:id
const updateUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const user = await User.findOneAndUpdate(
    { _id: req.params.id },
    { firstName, lastName, email, password },
    { new: true }
  );

  if (user) {
    res.status(200).json({
      Success: true,
      user,
    });
  } else {
    res.status(404).json({
      Success: false,
      Error: `No user found with id ${req.params.id}`,
    });
  }
});

// @desc        Delete user by id
// @route       Delete /api/users/:id
const deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    Success: true,
    Message: `User with id ${req.params.id} deleted`,
  });
});

export {
  authUser,
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
