const express = require("express");
const { getAllJobs } = require("../controllers/jobController");
const router = express.Router();

router.route("/").get(getAllJobs);
module.exports = router;
