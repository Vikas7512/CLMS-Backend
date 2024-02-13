const express = require("express");
const User = require("./model/usermodel");

const UserRouter = express.Router();

UserRouter.post("/", async (req, res) => {
  const { name, email, password, phone_no, stream } = req.body;
  const user = await User.create({ name, email, password, phone_no, stream });
  return res.status(201).json(user);
});

module.exports = UserRouter;
