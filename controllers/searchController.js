const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Product = require("../models/Product");

// @desc    Get other user profiles

const allUsers = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { enrollmentNo: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(keyword, "-password -email").find({ _id: { $ne: req.user._id } });
      //don't show email and password of the user
    res.send(users);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

const allProducts = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { category: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const products = await Product.find(keyword);
    res.send(products);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});


module.exports = { allUsers, allProducts };