//external module
const express = require("express");
const authRouter = express.Router();
//local module
const pageController = require('../controllers/authController');

authRouter.get("/login", pageController.getLoginPage);
authRouter.post("/login", pageController.postLoginPage);
authRouter.get("/logout", pageController.getLogoutPage);

module.exports = authRouter;