//external module
const path = require('path');
//local modules
const homeControllers = require('./userPage')

exports.loginPage = (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', "views", "login.html"));
  console.log(homeControllers.homes);
};