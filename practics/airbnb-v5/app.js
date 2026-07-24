//core module
const path = require('path');
//external module
const express = require('express');
//local module
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, "views", "loginPage.html"));
})

app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.use((req, res, next) => {
    res.status(404).render('404page', { pageName: "Error Page"});
})

app.listen(3001, () => {console.log("SERVER START......")});