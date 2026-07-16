const Home = require('../models/home');

exports.getContact = (req, res, next) => {
  res.render("contactUs", {pageTitle: "Contact Page"});
};

exports.getRegisterHome = (req, res, next) => {
  res.render("registerHome", {pageTitle: "Home Registration"});
};

exports.postRegisterHome = (req, res, next) => {
  res.send(`<h1>Home registration successfully.</h1><br>
        <button><a href="/user/home">Check Home List</a></button>`);
  const {houseName , price, location, rating, photoUrl} = req.body;
  const home = new Home(houseName , price, location, rating, photoUrl);
  home.save();
};

exports.getHome = (req, res, next) => {
  const homes = Home.fetchAll();
  res.render("home", { homes:homes, pageTitle: 'Home Page' });
};