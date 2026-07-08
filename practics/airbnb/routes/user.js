//core module
const path = require('path');
//external module
const express = require('express');
const userRouter = express.Router();

userRouter.get('/home', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'home.html'));
})

userRouter.get('/contact-us', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'contactUs.html'));
})

module.exports = userRouter;