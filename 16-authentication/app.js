//core module
const path = require("path");
//external module
const express = require("express");
const { default: mongoose } = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
//local module
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const authRouter = require("./routes/auth");

const dbPath =
  "mongodb://root:root@ac-hb1tzqd-shard-00-00.fhpqazo.mongodb.net:27017,ac-hb1tzqd-shard-00-01.fhpqazo.mongodb.net:27017,ac-hb1tzqd-shard-00-02.fhpqazo.mongodb.net:27017/airbnb?ssl=true&replicaSet=atlas-km16gb-shard-0&authSource=admin&appName=testgodb+srv://root:root@test.fhpqazo.mongodb.net/airbnb?appName=test";
const PORT = 3001;

const store = new MongoDBStore({
  uri: dbPath,
  collection: "sessions",
});

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "test",
    resave: false,
    saveUninitialized: true,
    store,
  }),
);

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn || false;
  next();
});

app.use("/host", (req, res, next) => {
  if (!req.isLoggedIn) {
    return res.redirect("/login");
  }
  next();
});

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

mongoose.connect(dbPath).then(() => {
  app.listen(PORT, () => {
    console.log("SERVER START......");
  });
});
