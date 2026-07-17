//core module
const path = require('path');
//external module
const express = require('express');
const userRouter = express.Router();

userRouter.get('/userHome', (req, res, next) => {
    // res.sendFile(path.join(__dirname, '../', 'views', 'userHome.html'));
    res.render('userHome', {pageName: "Home Page"});//always check in views folder
})

userRouter.get('/contact-us', (req, res, next) => {
    // res.sendFile(path.join(__dirname, '../', 'views', 'contactPage.html'));
    res.render('contactPage', {pageName: "Contact Page"});
})

userRouter.get('/homeList', (req, res, next) => {
    // res.sendFile(path.join(__dirname, "../" , "views", "homeListPage.html"));
    res.render('homeListPage', {pageName: "Home List Page"});
})

userRouter.get('/registerHome', (req, res, next) => {
    // res.sendFile(path.join(__dirname, "../" , "views", "registerHomePage.html"));
    res.render('registerHomePage', {pageName: "Home Registration"});
})

module.exports = userRouter;