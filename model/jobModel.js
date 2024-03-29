const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "please enter a company"],
    },
    position: {
      type: String,
      required: [true, "please enter a job position"],
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "progress", "canceled"],
        message: "{VALUE} is not supported",
      },
      required: [true, "please enter job status"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide a user"],
    },
  },
  { timestamps: true }
);
const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
