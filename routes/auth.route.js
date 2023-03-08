const express = require("express");
const authRouter = express.Router();
const AuthController = require('../controller/auth.controller');

// Create routes for user here

authRouter.route("/login").post(AuthController.login);
authRouter.route("/register").post(AuthController.register);

module.exports = authRouter;
