import User from "../Models/UserModel.js";
import generateToken from "../Utils/generateToken.js";
import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";

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

// CREATE

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
    try {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        closets: [
          {
            closetName: "All Gear",
            closet_id: new uuidv4(),
            specs: [],
            contents: [],
          },
        ],
      });
      res.status(201).json({
        Success: true,
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        closets: user.closets,
        token: generateToken(user._id),
      });
    } catch (err) {
      res.status(400).json({
        Success: false,
        Error: err,
      });
    }
  }
});

// READ

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

/*
* UPDATE
*   updateName,
*   updateEmail,
*   updatePassword,
*   updateCloset....
*     CREATE:   addNewCloset
*     READ:     getClosets -> no-op, it's embedded
*     UPDATE:
*               updateName,
*               editSpecs
*               addToCloset
                deleteFromCloset,
  *   DELETE    deleteCloset
  *
  *             createGear,
  *             READ no-op -> it's embedded
  *             edit name
  *             editSpecs
  *             addToCloset
  *             removeFromCloset
  *DELETE CLOSET
*
*
* */

// @desc    Update user details by ID
// @route   PUT /api/:id
const updateUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  // handle no user found
  if (!user) {
    res.status(404).json({
      Success: false,
      Error: `No user with id ${req.params.id}`,
    });
  }

  const { firstName, lastName, email } = req.body;

  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;

  try {
    await user.save();

    res.status(203).json({
      Success: true,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      Success: false,
      Error: err,
    });
  }
});

// @desc        Change Password
// @route       PUT /api/users/:id/password
const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  // handle no user found
  if (!user) {
    res.status(404).json({
      Success: false,
      Error: `No user with id ${req.params.id}`,
    });
  }

  // change password
  user.password = req.body.password;
  await user.save();

  res.status(203).json({
    Success: true,
    Message: `Password changed for user with id ${user._id}`,
  });
});

// @desc        Delete user by id
// @route       DELETE /api/users/:id
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
  updateUserDetails,
  changePassword,
  deleteUser,
};
