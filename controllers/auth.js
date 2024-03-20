const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
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
  // const user = await User.create({ ...req.body });
  // res.status(StatusCodes.CREATED).json(user);
};
module.exports = {
  register,
  login,
};
