//external module
const express = require("express");
const adminRouter = express.Router();
//local module
const pageController = require('../controllers/adminController');

adminRouter.get("/adminHome", pageController.adminPage);

adminRouter.get("/hostHome", pageController.hostHomePage);

adminRouter.post("/submit", pageController.contactSubmitPage);

module.exports = adminRouter;