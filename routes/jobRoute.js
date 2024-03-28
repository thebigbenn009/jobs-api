const express = require("express");
const {
  getAllJobs,
  createJob,
  updateJob,
  getJob,
} = require("../controllers/jobController");
const router = express.Router();

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getJob).patch(updateJob);
module.exports = router;
