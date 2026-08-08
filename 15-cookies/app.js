//core module
const path = require("path");
//external module
const express = require("express");
const { default: mongoose } = require("mongoose");
//local module
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const authRouter = require("./routes/auth");

const app = express();

app.use((req, res, next) => {
  const cookies = req.get("cookie") || "";
  const loginCookie = cookies
    .split("; ")
    .find((cookie) => cookie.startsWith("isLoggedIn="));
  req.isLoggedIn = loginCookie?.split("=")[1] === "true";
  next();
});

app.use("/host", (req, res, next) => {
  if (!req.isLoggedIn) {
    return res.redirect("/login");
  }
  next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "loginPage.html"));
});

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use(authRouter);

app.use((req, res, next) => {
  res
    .status(404)
    .render("404page", { pageName: "Error Page", isLoggedIn: req.isLoggedIn });
});

const dbPath =
  "mongodb://root:<password>@ac-hb1tzqd-shard-00-00.fhpqazo.mongodb.net:27017,ac-hb1tzqd-shard-00-01.fhpqazo.mongodb.net:27017,ac-hb1tzqd-shard-00-02.fhpqazo.mongodb.net:27017/airbnb?ssl=true&replicaSet=atlas-km16gb-shard-0&authSource=admin&appName=testgodb+srv://root:root@test.fhpqazo.mongodb.net/airbnb?appName=test";
const PORT = 3001;

mongoose.connect(dbPath).then(() => {
  app.listen(PORT, () => {
    console.log("SERVER START......");
  });
});
