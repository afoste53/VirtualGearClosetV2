import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../Models/UserModel.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({
        Success: false,
        Error: err.message,
      });
      throw new Error("Not Authorized - Token Failed");
    }
  }

  if (!token) {
    res.status(401).json({
      Success: false,
      Error: "Not authorized - No token",
    });
    throw new Error("Not Authorized - No Token");
  }
});

export { authMiddleware };
