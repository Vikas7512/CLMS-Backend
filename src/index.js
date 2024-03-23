const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const md5 = require("md5");
// const UserRouter = require("./routes");
const BookRouter = require("./book/book.routes");
const UserRouter = require("./user/user.routes");
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
app.use("/books", BookRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

module.exports = connection;
