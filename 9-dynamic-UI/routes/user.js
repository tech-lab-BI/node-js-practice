//core module
const path = require("path");
//external module
const express = require("express");
const userRouter = express.Router();

const homes = [];

userRouter.use(express.urlencoded());

userRouter.get("/home", (req, res, next) => {
  // res.sendFile(path.join(__dirname, "../", "views", "home.html"));
  res.render("home", { homes:homes, pageTitle: 'Home Page' });
});

userRouter.get("/contact-us", (req, res, next) => {
  // res.sendFile(path.join(__dirname, "../", "views", "contactUs.html"));
  res.render("contactUs", {pageTitle: "Contact Page"});
});

userRouter.get("/register-home", (req, res, next) => {
  // res.sendFile(path.join(__dirname, "../", "views", "registerHome.html"));
  res.render("registerHome", {pageTitle: "Home Registration"});
});

userRouter.post("/register-home", (req, res, next) => {
  res.send(`<h1>Home registration successfully.</h1><br>
        <button><a href="/user/home">Check Home List</a></button>`);
  console.log("Home : ", req.body.name);
  homes.push({ houseName: req.body.name, price: req.body.price, location:req.body.location, rating:req.body.rating, photoUrl:req.body.photoUrl });
});

// module.exports = {
//   userRouter,
//   homes
// };

exports.userRouter = userRouter;
exports.homes = homes;
