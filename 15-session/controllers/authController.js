exports.getLoginPage = (req, res, next) => {
  console.log(req.session);
  res.render("auth/login", { pageName: "Login", isLoggedIn: false });
};

exports.postLoginPage = (req, res, next) => {
  req.session.isLoggedIn = true;
  // res.cookie("isLoggedIn", true);
  res.redirect("/user/userHome");
};

exports.getLogoutPage = (req, res, next) => {
  // res.cookie("isLoggedIn", false);
  // console.log(req.cookies);
  // req.session.isLoggedIn = false;
  req.session.destroy();
  res.redirect("/login");
};