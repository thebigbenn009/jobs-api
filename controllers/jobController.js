const Job = require("../model/jobModel");

const getAllJobs = async (req, res) => {
  const job = await Job.findById();
};
