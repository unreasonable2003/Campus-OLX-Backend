const express = require("express");
const { protect } = require("../middleware/authentication");
const multer = require('multer');

const {
  getAllProducts,
  getAllProductsOfUser,
  deleteProduct,
  editProduct,
  createProduct
} = require('../controllers/productController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/image/posts");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// Define file filter function
const fileFilter = (req, file, cb) => {
  // Check if the file is an image
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Not an image! Please upload an image."), false); // Reject the file
  }
};

// Create multer upload instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

const router = express.Router();

// Apply protect middleware to the routes that require authentication
router.route("/").get(getAllProducts).post(protect, upload.array('images', 10), createProduct);
router.route("/user").get(protect, getAllProductsOfUser);
router.route("/:id").put(protect, editProduct).delete(protect, deleteProduct);

module.exports = router;
