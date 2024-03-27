const BadRequestError = require("../error/badRequestError");
const Job = require("../model/jobModel");
const { StatusCodes } = require("http-status-codes");
const User = require("../model/userModel");
const UnauthorizedError = require("../error/unauthorizedError");

const getAllJobs = async (req, res) => {
  const id = req.userInfo.userID;
  console.log(id);
  const jobs = await Job.findById({ _id: id });
  res.status(StatusCodes.OK).json({ count: jobs?.length, jobs });
};

const createJob = async (req, res) => {
  const id = req.userInfo.userID;

  const { position, company } = req.body;
  if (!position || !company) {
    throw new BadRequestError("Please fill the required fields");
  }
  const job = await Job.create({ ...req.body, createdBy: id });
  res.status(StatusCodes.CREATED).json({ job });
};
module.exports = { getAllJobs, createJob };
