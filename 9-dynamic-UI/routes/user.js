//core module
const path = require("path");
//external module
const express = require("express");
const userRouter = express.Router();

const homes = [];

userRouter.use(express.urlencoded());

userRouter.get("/home", (req, res, next) => {
  // res.sendFile(path.join(__dirname, "../", "views", "home.html"));
  res.render("home", { homes });
});

userRouter.get("/contact-us", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "contactUs.html"));
});

userRouter.get("/register-home", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "registerHome.html"));
});

userRouter.post("/register-home", (req, res, next) => {
  res.send(`<h1>Home registration successfully.</h1><br>
        <button><a href="/user/home">Check Home List</a></button>`);
  console.log("Home : ", req.body.name);
  homes.push({ houseName: req.body.name });
});

// module.exports = {
//   userRouter,
//   homes
// };

exports.userRouter = userRouter;
exports.homes = homes;
