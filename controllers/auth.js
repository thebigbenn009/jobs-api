const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/User");

const register = async (req, res) => {
  // const { name, email, password } = req.body;
  // const salt = await bcrypt.genSalt(10);
  // const hashedPasswrord = await bcrypt.hash(password, salt);
  // const tempUser = { name, email, password: hashedPasswrord };
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: { name: user.name },
    token,
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  //compare password
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequestError("Wrong Password");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: { name: user.name },
    token,
  });
};
module.exports = {
  register,
  login,
};
