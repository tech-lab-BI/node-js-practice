//external module
const express = require("express");
const authRouter = express.Router();
//local module
const pageController = require('../controllers/authController');

authRouter.get("/login", pageController.getLoginPage);
authRouter.post("/login", pageController.postLoginPage);

module.exports = authRouter;