const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const authenticationMiddleware = (req, res, next) => {
  try {
    const authorized = req.headers.authorization;
    if (!authorized || !authorized.startsWith("Bearer ")) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Missing or invalid token" });
    }
    const token = authorized.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userInfo = { userID: payload.id, email: payload.email, token };
    next();
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid token" });
  }
};
module.exports = authenticationMiddleware;
