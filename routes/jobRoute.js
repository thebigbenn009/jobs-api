const express = require("express");
const {
  getAllJobs,
  createJob,
  updateJob,
} = require("../controllers/jobController");
const router = express.Router();

router.route("/").get(getAllJobs).post(createJob).patch(updateJob);
module.exports = router;
