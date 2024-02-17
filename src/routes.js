const express = require("express");
const md5 = require("md5");
const User = require("./model/usermodel");

const UserRouter = express.Router();

UserRouter.post("/", async (req, res) => {
  const { name, email, password, phone_no, stream } = req.body;
  const userExits = await User.findOne({ email: email });
  if (userExits) {
    return res.status(409).json("User already exists.");
  }
   const md5Pass = md5(password)
  const user = await User.create({ name, email,password:md5Pass , phone_no, stream });
  return res.status(201).json("User created");
});

module.exports = UserRouter;
