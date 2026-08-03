//external module
const express = require("express");
const adminRouter = express.Router();
//local module
const pageController = require('../controllers/adminController');

adminRouter.get("/adminHome", pageController.adminPage);
adminRouter.get("/hostHome", pageController.hostHomePage);
adminRouter.post("/hostHome", pageController.postHostHomePage);
adminRouter.post("/submit", pageController.contactSubmitPage);
adminRouter.get("/registerHome", pageController.registrationPage);
adminRouter.get("/editHome/:homeId", pageController.editHomePage);
adminRouter.post("/editHome", pageController.postEditHomePage);
adminRouter.post("/deleteHome/:homeId", pageController.deleteHome);

module.exports = adminRouter;