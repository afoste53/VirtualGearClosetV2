import User from "../Models/UserModel";

/**************************************************
 * @desc        Auth Users and get token
 * @route       POST /api/users/login
 *************************************************/
const authUser = async (req, res) => {};

/**************************************************
 * @desc        Create a new user
 * @route       POST /api/users/
 *************************************************/
const createUser = async (req, res) => {};

/**************************************************
 * @desc        Get user by id
 * @route       GET /api/users/:id
 *************************************************/
const getUserById = async (req, res) => {};

/**************************************************
 * @desc        Update user by id
 * @route       Put /api/users/:id
 *************************************************/
const updateUser = async (req, res) => {};

/**************************************************
 * @desc        Delete user by id
 * @route       Delete /api/users/:id
 *************************************************/
const deleteUser = async (req, res) => {};

export { authUser, createUser, getUserById, updateUser, deleteUser };
