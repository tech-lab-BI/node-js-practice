//external modules
const express = require("express");
const adminRouter = express.Router();
//local modules
const adminPageControllers = require('../controllers/adminPage');

adminRouter.post("/submit", adminPageControllers.adminPage);

module.exports = adminRouter;