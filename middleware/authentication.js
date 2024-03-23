const { UnauthenticatedError } = require("../errors");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //attach the user to the job route
    req.user = { userID: payload.userID, name: payload.name };
    console.log(payload);
    next();
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError("Authentication Invalid");
  }
};
module.exports = auth;
