const express = require("express");
require("dotenv").config();
require("express-async-errors");
const connectDB = require("./db/db");
const app = express();
const cors = require("cors");
const registerRouter = require("./routes/registerRoute");

const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");

//middleware
app.use(express.json());
// app.use(cors());
app.use("/api/auth/", registerRouter);

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
