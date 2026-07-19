//core module
const path = require("path");
//external module
const express = require("express");
const adminRouter = express.Router();
//local module
const {getData} = require('../utils/fileHelper');

let homes = [];

adminRouter.get("/adminHome", (req, res, next) => {
  getData((homes) => {
    res.render("admin/adminHome", { pageName: "Admin Panel", homes: homes});
  });
});

adminRouter.get("/hostHome", (req, res, next) => {
  getData((homes) => {
    res.render("admin/hostHomes", { pageName: "Admin Panel", homes: homes});
  });
});

adminRouter.post("/submit", (req, res, next) => {
  res.send(`
        <h1>Thank You for Contact We will reach you shortly........</h1>
        <a href="/">Back to Login</a>
        `);
  // res.render('admin/adminHome', {pageName: "Admin Home Page"});
});

module.exports = adminRouter;
