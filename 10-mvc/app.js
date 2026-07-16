//core module
const path = require("path");
//external module
const express = require("express");
//local module
const { userRouter, homes } = require("./routes/user");
const adminRouter = require("./routes/admin");
const loginPageControllers = require('./controllers/login');
const errorPageControllers = require('./controllers/error');

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", loginPageControllers.loginPage);

app.use(express.static(path.join(__dirname, "public"))); //make public folder globally accessable

app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.use(errorPageControllers.pageNotFound);

app.listen(3001, () => {
  console.log("SERVER START......");
});
