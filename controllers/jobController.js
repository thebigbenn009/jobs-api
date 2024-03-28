const BadRequestError = require("../error/badRequestError");
const Job = require("../model/jobModel");
const { StatusCodes } = require("http-status-codes");
const User = require("../model/userModel");
const UnauthorizedError = require("../error/unauthorizedError");
const NotFoundError = require("../error/not-found-error");

const getAllJobs = async (req, res) => {
  const id = req.userInfo.userID;

  const user = await User.findById(id);

  const jobs = await Job.find({ createdBy: id });
  res
    .status(StatusCodes.OK)
    .json({ user: user.name, count: jobs.length, jobs });
};

const createJob = async (req, res) => {
  const id = req.userInfo.userID;

  const user = await User.findById(id);

  const { position, company } = req.body;
  if (!position || !company) {
    throw new BadRequestError("Please fill the required fields");
  }
  console.log(user);
  const job = await Job.create({ ...req.body, createdBy: id });
  res.status(StatusCodes.CREATED).json({ job, user: user.name });
};

const updateJob = async (req, res) => {
  const id = req.userInfo.userID;
  const { id: jobID } = req.params;
  const { company, position } = req.body;
  //   if (!company || !position) {
  //     throw new BadRequestError("Please fill out the required fields");
  //   }
  const updatedJob = await Job.findOneAndUpdate(
    { _id: jobID, createdBy: id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedJob) {
    throw new NotFoundError("Job not found!");
  }
  res.status(StatusCodes.OK).json({ job: updatedJob });
};
module.exports = { getAllJobs, createJob, updateJob };
