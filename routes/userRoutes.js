const express = require('express');
// const {protect} = require('../middleware/authentication');
const {registerUser,authUser, verifyCode} = require('../controllers/userController');
const router = express.Router();

router.route("/").post(registerUser);
router.route("/verify").post(verifyCode)
router.post("/login", authUser);

module.exports = router;