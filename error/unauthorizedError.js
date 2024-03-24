const CustomAPIError = require("./customError");
const { StatusCodes } = require("http-status-codes");

class UnauthorizedError extends CustomAPIError {
  constructor(message) {
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
module.exports = UnauthorizedError;
