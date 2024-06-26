const express = require("express");
require("dotenv").config();
require("express-async-errors");
const connectDB = require("./db/db");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const jobRoute = require("./routes/jobRoute");

const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");
const authenticationMiddleware = require("./middleware/authenticationMiddleware");

//middleware
app.use(express.json());
// app.use(cors());
app.use("/api/auth/", userRoute);
app.use("/api/v1/jobs/", authenticationMiddleware, jobRoute);

app.use(errorHandlerMiddleware);

//start the express app
const port = process.env.PORT;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
