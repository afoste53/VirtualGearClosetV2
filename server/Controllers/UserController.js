import User from "../Models/UserModel.js";
import generateToken from "../Utils/generateToken.js";
import asyncHandler from "express-async-handler";

// @desc        Auth Users and get token
//@route       POST /api/users/login
const authUser = async (req, res) => {};

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
    throw new Error("User already exists");
  } else {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName,
        lastName,
        email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

// @desc        Get user by id
// @route       GET /api/users/:id
const getUserById = async (req, res) => {};

// @desc        Update user by id
// @route       Put /api/users/:id
const updateUser = async (req, res) => {};

// @desc        Delete user by id
// @route       Delete /api/users/:id
const deleteUser = async (req, res) => {};

export { authUser, createUser, getUserById, updateUser, deleteUser };
