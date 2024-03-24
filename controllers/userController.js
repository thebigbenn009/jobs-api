const BadRequestError = require("../error/badRequestError");
const User = require("../model/userModel");
const { StatusCodes } = require("http-status-codes");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  // if (!email || !password) {
  //   throw new BadRequestError("Please provide email and password");
  // }
  const user = await User.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({ user });
};
module.exports = { registerUser };
