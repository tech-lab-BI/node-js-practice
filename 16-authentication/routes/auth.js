//external module
const express = require("express");
const authRouter = express.Router();
//local module
const pageController = require('../controllers/authController');

authRouter.get("/login", pageController.getLoginPage);
authRouter.post("/login", pageController.postLoginPage);
authRouter.get("/signup", pageController.getSignUpPage);
authRouter.post("/signup", pageController.postSignUpPage);

authRouter.get("/logout", pageController.getLogoutPage);

module.exports = authRouter;