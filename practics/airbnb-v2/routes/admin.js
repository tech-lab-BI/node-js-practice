//core module
const path = require('path');
//external module
const express = require('express');
const adminRouter = express.Router();

adminRouter.post('/submit', (req, res, next) => {
    res.send(`<h1>Application submitted successfully.</h1> We will conecct you shortly.......
        <a href="/">Return Login</a>`)
})

adminRouter.get('/adminHome', (req, res, next) => {
    // res.sendFile(path.join(__dirname, "../", "views" , "adminHome.html"));
    res.render('adminHome', {pageName: "Admin Home Page"});
})

module.exports = adminRouter;