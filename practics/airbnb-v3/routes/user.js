//core module
const path = require("path");
const fs = require("fs");
//external module
const express = require("express");
const userRouter = express.Router();
//local module
const { getData, putData } = require("../utils/fileHelper");

let homes = [];

userRouter.use(express.urlencoded());

userRouter.get("/userHome", (req, res, next) => {
  // res.sendFile(path.join(__dirname, '../', 'views', 'userHome.html'));
  res.render("userHome", { pageName: "Home Page" }); //always check in views folder
});

userRouter.get("/contact-us", (req, res, next) => {
  // res.sendFile(path.join(__dirname, '../', 'views', 'contactPage.html'));
  res.render("contactPage", { pageName: "Contact Page" });
});

userRouter.get("/homeList", (req, res, next) => {
  // res.sendFile(path.join(__dirname, "../" , "views", "homeListPage.html"));
  getData((homes) => {
    res.render("homeListPage", { pageName: "Home List Page", homes: homes });
  });
});

userRouter.post("/homeList", (req, res, next) => {
  // res.sendFile(path.join(__dirname, "../" , "views", "homeListPage.html"));
  getData((homes) => {
    homes.push({
      houseName: req.body.houseName,
      price: req.body.price,
      location: req.body.location,
      rating: req.body.rating,
      photoUrl: req.body.photoUrl,
    });
    putData(homes, () => {
      res.redirect("/user/homeList");
      // res.render("homeListPage", {//for refresh everytime last house added once more time
      //   pageName: "Home List Page",
      //   homes: homes,
      // });
    });
  });
});

userRouter.get("/registerHome", (req, res, next) => {
  // res.sendFile(path.join(__dirname, "../" , "views", "registerHomePage.html"));
  res.render("registerHomePage", { pageName: "Home Registration" });
});

module.exports = userRouter;
