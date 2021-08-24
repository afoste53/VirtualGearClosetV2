import User from "../Models/UserModel.js";
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
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({
      Success: false,
      Error: "Invalid credentials",
    });
    throw new Error("Invalid credentials");
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
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.status(200).json({
      Success: true,
      user,
    });
  } else {
    res.status(400).json({
      Success: false,
      Error: `User not found with id ${req.params.id}`,
    });
    throw new Error(`User not found with id ${req.params.id}`);
  }
});

// @desc        Update user by id
// @route       Put /api/users/:id
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;

    user.password = req.body.password;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
  } else {
    const error = `No user found with id ${req.params.id}`;

    res.status(404).json({
      Success: false,
      Error: error,
    });
    throw new Error(error);
  }
});

// @desc        Delete user by id
// @route       Delete /api/users/:id
const deleteUser = async (req, res) => {};

export { authUser, createUser, getUserById, updateUser, deleteUser };
