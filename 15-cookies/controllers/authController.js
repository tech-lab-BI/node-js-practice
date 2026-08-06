exports.getLoginPage = (req, res, next) => {
  res.render("auth/login", { pageName: "Login", isLoggedIn: false });
};

exports.postLoginPage = (req, res, next) => {
  res.cookie("isLoggedIn", true);
  res.redirect("/user/userHome");
};

exports.getLogoutPage = (req, res, next) => {
  res.cookie("isLoggedIn", false);
  console.log(req.cookies);
  res.redirect("/login");
};