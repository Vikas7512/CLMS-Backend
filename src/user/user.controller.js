const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const UserController = () => {};

const saltRounds = 10;
UserController.createUser = async (req, res) => {
  const { name, email, password, phone_no, stream } = req.body;
  const userExits = await User.findOne({ email: email });
  if (userExits) {
    return res.status(409).json("User already exists.");
  }
  const hashPass = await bcrypt.hash(password, saltRounds);
  const user = await User.create({
    name,
    email,
    password: hashPass,
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
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json("User not found");
    }
    const checkValidPassword = await bcrypt.compare(password, user.password);
    if (!checkValidPassword) {
      return res.status(401).json("Wrong Password");
    }
    return res.status(200).json({ email: user.email, isAdmin: user.isAdmin });
  } catch (error) {
    return res.status(500).json("Error while authenticating user");
  }
};

module.exports = UserController;
