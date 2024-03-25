const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong, please try again later",
  };
  if (err.name === "ValidationError") {
    customError.message = Object.values(err.errors)
      .map((err) => err.message)
      .join(", ");
    customError.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    customError.message = `${err.keyValue.email} has already been used by another user. Please try a different email`;
    customError.statusCode = 400;
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res
    .status(customError.statusCode)
    .json({ message: customError.message });
};
module.exports = errorHandlerMiddleware;
