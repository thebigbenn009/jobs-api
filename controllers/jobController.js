const Job = require("../model/jobModel");
const { StatusCodes } = require("http-status-codes");

const getAllJobs = async (req, res) => {
  const id = req.userInfo.userID;
  const jobs = await Job.findById({ _id: id });
  res.status(StatusCodes.OK).json({ count: jobs.length, jobs });
};

module.exports = { getAllJobs };
