const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const authenticationMiddleware = require("../middleware/authenticationMiddleware");
const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
module.exports = router;
