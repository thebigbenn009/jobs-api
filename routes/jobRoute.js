const express = require("express");
const { getAllJobs, createJob } = require("../controllers/jobController");
const router = express.Router();

router.route("/").get(getAllJobs).post(createJob);
module.exports = router;
