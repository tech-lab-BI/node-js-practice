exports.getLoginPage = (req, res, next) => {
  res.render("auth/login", { pageName: "Login"});
};

exports.postLoginPage = (req, res, next) => {
    res.redirect("/user/userHome");
};