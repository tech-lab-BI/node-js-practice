//local module
const {putData, getData} = require('../model/fileHelper');

exports.adminPage = (req, res, next) => {
  getData((homes) => {
    res.render("admin/adminHome", { pageName: "Admin Panel", homes: homes});
  });
};

exports.hostHomePage = (req, res, next) => {
  getData((homes) => {
    res.render("admin/hostHomes", { pageName: "Admin Panel", homes: homes});
  });
};

exports.contactSubmitPage = (req, res, next) => {
  res.send(`
    <h1>Thank You for Contact We will reach you shortly........</h1>
    <a href="/">Back to Login</a>
  `);
};