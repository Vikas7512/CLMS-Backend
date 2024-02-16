const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const UserRouter = require("./routes");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
const connection = mongoose
  .connect("mongodb://127.0.0.1:27017/library")
  .then(() => console.log(" Backend is Connected!"));

app.get("/", function (req, res) {
  res.status(200).json({ message: "get user details" });
});

app.use("/users", UserRouter);

app.listen(3000);

module.exports = connection;
