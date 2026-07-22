//external module
const express = require("express");
const userRouter = express.Router();
//local module
const pageController = require('../controllers/userController');

userRouter.use(express.urlencoded());

userRouter.get("/userHome", pageController.homePage);
userRouter.get("/contact-us", pageController.contactPage);
userRouter.get("/homeList", pageController.getHomeListPage);
userRouter.post("/homeList", pageController.postHomeListPage);
userRouter.get("/homeList/:homeId", pageController.homeDetailsPage);
userRouter.get("/booking", pageController.bookingPage);
userRouter.get("/favourite", pageController.favouritePage);
userRouter.get("/registerHome", pageController.registrationPage);

module.exports = userRouter;