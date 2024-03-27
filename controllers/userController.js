const BadRequestError = require("../error/badRequestError");
const UnauthorizedError = require("../error/unauthorizedError");
const User = require("../model/userModel");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.generateJWT();
  console.log(token);
  const { name, email } = user;

  res.status(StatusCodes.CREATED).json({ name, email, token });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    throw new BadRequestError("please fill both email and password fields.");
  }

  // Find user by email
  const user = await User.findOne({ email });
  // Check if user exists
  if (!user) {
    throw new UnauthorizedError("Invalid credentials");
  }
  // Compare passwords
  const isPasswordCorrect = await user.comparePasswords(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError("worng password!");
  }
  const token = user.generateJWT();
  // const userDetails = {
  //   id: req.userInfo.userID,
  //   email: req.userInfo.email,
  //   token: req.userInfo.token,
  // };
  res.status(StatusCodes.OK).json({ user, token });
};
module.exports = { registerUser, loginUser };
