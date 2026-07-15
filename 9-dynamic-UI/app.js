//core module
const path = require("path");
//external module
const express = require("express");
//local module
const { userRouter, homes } = require("./routes/user");
const adminRouter = require("./routes/admin");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
  console.log(homes);
});

app.use(express.static(path.join(__dirname, "public"))); //make public folder globally accessable

app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "pageNotFound.html"));
});

app.listen(3001, () => {
  console.log("SERVER START......");
});
