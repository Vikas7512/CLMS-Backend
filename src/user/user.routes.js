const express = require("express");
const UserController = require("./user.controller");

const UserRouter = express.Router();

UserRouter.post("/", UserController.createUser);
UserRouter.post("/login", UserController.login);

module.exports = UserRouter;
