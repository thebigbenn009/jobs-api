const getAllJobs = async (req, res) => {
  res.send("All Jobs");
};
const getJob = async (req, res) => {
  res.send("Get Job");
};
const createJob = async (req, res) => {
  res.json(req.user);
};
const updateJob = async (req, res) => {
  res.send("Update Jobs");
};
const deleteJob = async (req, res) => {
  res.send("Delete Jobs");
};
module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
