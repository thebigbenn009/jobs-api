const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong. Try again later.",
  };
  if (err.name === "ValidationError") {
    customError.message = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");
    customError.message = 400;
  }
  if (err.code && err.code === 11000) {
    customError.message = `${err.keyValue.email} has already been chosen. Please try another email.`;
    customError.statusCode = 400;
  }
  return res
    .status(customError.statusCode)
    .json({ message: customError.message });
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};
module.exports = errorHandlerMiddleware;
