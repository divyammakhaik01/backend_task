const express = require("express");
const UserProfileController = require("../controller/user.controller");
const UserRouter = express.Router();


UserRouter.route("/create_profile").post(UserProfileController.create);
UserRouter.route("/edit_profile").patch(UserProfileController.edit);
UserRouter.route("/get").get(UserProfileController.getAllUsers);

module.exports = UserRouter;
