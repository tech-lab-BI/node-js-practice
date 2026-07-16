//external module
const express = require("express");
const userRouter = express.Router();

//local module
const homeControllers = require('../controllers/userPage');

userRouter.use(express.urlencoded());

userRouter.get("/home", homeControllers.getHome);

userRouter.get("/contact-us", homeControllers.getContact);

userRouter.get("/register-home", homeControllers.getRegisterHome);

userRouter.post("/register-home", homeControllers.postRegisterHome);

exports.userRouter = userRouter;