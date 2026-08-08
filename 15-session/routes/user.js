//external module
const express = require("express");
const userRouter = express.Router();
//local module
const pageController = require('../controllers/userController');

userRouter.get("/userHome", pageController.homePage);
userRouter.get("/contact-us", pageController.contactPage);
userRouter.get("/homeList", pageController.getHomeListPage);
userRouter.get("/homeList/:homeId", pageController.homeDetailsPage);
userRouter.get("/booking", pageController.bookingPage);
userRouter.get("/favourite", pageController.favouritePage);
userRouter.post("/favourite", pageController.addToFavourite);
userRouter.post("/deleteFav/:homeId", pageController.removeFromFav);

module.exports = userRouter;