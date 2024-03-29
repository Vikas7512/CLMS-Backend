const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserModel = new Schema({
  name: String,
  email: String,
  password: String,
  phone_no: Number,
  stream: String,
});

const User = mongoose.model("user", UserModel);

module.exports = User;
