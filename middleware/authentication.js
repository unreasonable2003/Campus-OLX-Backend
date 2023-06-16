const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        res.status(401);
        throw new Error("Not authorized, no user found");
      }

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// const auth = asyncHandler(async (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     const verifyUser = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findOne({ _id: verifyUser._id });

//     req.token = token;
//     req.user = user;

//     next();
//   }catch(err){
//     res.status(401).json({message: "Unauthorized"});
//   }
// })


module.exports = { protect };