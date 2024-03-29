const express = require("express");
const {
  getAllJobs,
  createJob,
  updateJob,
  getJob,
  deleteJob,
} = require("../controllers/jobController");
const router = express.Router();

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);
module.exports = router;
