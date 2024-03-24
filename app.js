const express = require("express");
const connectDB = require("./db/db");
require("dotenv").config();
const app = express();
const registerRouter = require("./routes/registerRoute");

const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");

//middleware
app.use(express.json());
app.use("/api/auth/", registerRouter);
app.use(errorHandlerMiddleware);
//route
app.get("/", (req, res) => {
  res.send("Hello World");
});

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
