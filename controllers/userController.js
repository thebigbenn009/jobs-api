const BadRequestError = require("../error/badRequestError");
const User = require("../model/userModel");
const { StatusCodes } = require("http-status-codes");

const registerUser = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.generateJWT();
  console.log(token);
  const { name, email } = user;

  res.status(StatusCodes.CREATED).json({ name, email, token });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("please fill both email and password fields.");
  }
  res.status(StatusCodes.OK).json({ msg: "Hello" });
};
module.exports = { registerUser, loginUser };
