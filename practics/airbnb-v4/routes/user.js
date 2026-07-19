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
  res.render("user/userHome", { pageName: "Home", homes: homes}); //always check in views folder
});

userRouter.get("/contact-us", (req, res, next) => {
  res.render("user/contactPage", { pageName: "Contact" });
});

userRouter.get("/homeList", (req, res, next) => {
  getData((homes) => {
    res.render("user/homeListPage", { pageName: "Home List", homes: homes });
  });
});

userRouter.get("/booking", (req, res, next) => {
  getData((homes) => {
    res.render("user/bookingPage", { pageName: "My Booking", homes: homes });
  });
});

userRouter.post("/homeList", (req, res, next) => {
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
    });
  });
});

userRouter.get("/favourite", (req, res, next) => {
  getData((homes) => {
    res.render("user/favouritePage", {pageName: "Favourites",homes: homes });
  });
});

userRouter.get("/registerHome", (req, res, next) => {
  res.render("admin/registerHomePage", { pageName: "Home Registration" });
});

module.exports = userRouter;