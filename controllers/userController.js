const User = require("../model/userModel");
const { StatusCodes } = require("http-status-codes");

const registerUser = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.generateJWT();
  console.log(token);

  res.status(StatusCodes.CREATED).json({ user, token });
};
module.exports = { registerUser };
