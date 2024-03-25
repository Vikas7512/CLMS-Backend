const md5 = require("md5");
const User = require("../models/user.model");

const UserController = () => {};

UserController.createUser = async (req, res) => {
  const { name, email, password, phone_no, stream } = req.body;
  const userExits = await User.findOne({ email: email });
  if (userExits) {
    return res.status(409).json("User already exists.");
  }
  const md5Pass = md5(password);
  const user = await User.create({
    name,
    email,
    password: md5Pass,
    phone_no,
    stream,
  });
  if (!user) {
    return res.status(400).json("some error occured while creating user");
  }
  return res.status(201).json("User created");
};

UserController.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log({ email, password });
    const user = await User.findOne({ email: email, password: password });
    if (!user) {
      return res.status(404).json("User not found");
    }
    return res.status(200).json({ email: user.email, isAdmin: user.isAdmin });
  } catch (error) {
    return res.status(500).json("Error while authenticating user");
  }
};

module.exports = UserController;
