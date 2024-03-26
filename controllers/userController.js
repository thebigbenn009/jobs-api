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
  const user = await User.findOne({ email });

  const isPasswordCorrect = await user.comparePasswords(password);

  if (!email || !password) {
    throw new BadRequestError("please fill both email and password fields.");
  }
  if (!user) {
    throw new UnauthorizedError("Invalid credentials");
  }
  if (!isPasswordCorrect) {
    throw new UnauthorizedError("worng password!");
  }
  const token = user.generateJWT();
  const info = jwt.verify(token, process.env.JWT_SECRET);
  console.log(info);
  const userDetails = { name: user.name, id: user._id, token };
  res.status(StatusCodes.OK).json({ userDetails });
};
module.exports = { registerUser, loginUser };
