const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name to register"],
  },
  email: {
    type: String,
    required: [true, "please enter your email to register"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],

    unique: true,
  },
  password: {
    type: String,
    required: [true, "please enter your password"],
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
