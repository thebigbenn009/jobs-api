const CustomAPIError = require("../error/customError");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong. Try again later",
  };
  //validation error
  if (err.name === "ValidatorError") {
    customError.msg = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");
    customError.statusCode = 400;
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};
module.exports = errorHandlerMiddleware;
