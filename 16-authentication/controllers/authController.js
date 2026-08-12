//local module
const User = require("../model/authFunc");
const bcrypt = require('bcryptjs');

const { check, validationResult } = require("express-validator");

exports.getLoginPage = (req, res, next) => {
  // console.log(req.session);
  res.render("auth/login", { pageName: "Login", isLoggedIn: false });
};

exports.postLoginPage = async (req, res, next) => {
  const {email, password} = req.body;
  let error = null;
  try{
    const user = await User.findOne({email});

    if(user){
      const isMatchPass = await bcrypt.compare(password, user.password);
      if(isMatchPass){
        req.session.isLoggedIn = true;
        return res.redirect("/user/homeList");
      }
      error = ["Incorrect password"];
    }else{
      error = ["Invaild email"];
    }
    
  } catch(err) {
    console.log("Error in login : ", err);
    error = [err];
  }
  return res.render("auth/login", { pageName: "Login", isLoggedIn: false , errorMessage: error, oldEmail: email});
  // req.session.isLoggedIn = true;
  // res.cookie("isLoggedIn", true);
  // res.redirect("/user/userHome");
};

exports.getSignUpPage = (req, res, next) => {
  // console.log(req.session);
  res.render("auth/signup", { pageName: "SignUp", isLoggedIn: false });
};

exports.postSignUpPage = [
  check("fname")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 charecter long")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("First name can only charecter"),

  check("lname")
    .trim()
    .matches(/^[a-zA-Z]+$/)
    .withMessage("Last name can only charecter"),

  check("email")
    .trim()
    .isEmail()
    .withMessage("Enter a valid email")
    .normalizeEmail(),

  check("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 charecter long")
    .matches(/[a-z]/)
    .withMessage("password contain at least one lower charecter")
    .matches(/[A-Z]/)
    .withMessage("password contain at least one upper charecter")
    .matches(/[!@#$%^&*]/)
    .withMessage("password contain at least one special charecter"),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password do not match");
      }
      return true;
    }),

  check("userType").isIn(["guest", "host"]).withMessage("Invalid user Type"),

  check("terms")
    .equals("on")
    .withMessage("You must accept the terms and conditions"),

  (req, res, next) => {
    const { fname, lname, email, password, userType, terms } = req.body;
    console.log(req.body);
    // console.log(fName, lName);
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      // req.session.isLoggedIn = true;
      // res.cookie("isLoggedIn", true);
      // console.log(req.body);
      return bcrypt.hash(password, 12).then((hashPassword) => {
        const user = new User({ fname, lname, email, password: hashPassword, userType });
        return user
          .save()
          .then(() => {
            return res.redirect("/login");
          })
          .catch((err) => {
            console.log("Error while creating user DB : ", err);
            return res.status(422).render("auth/signup", {
              pageName: "Sign Up",
              isLoggedIn: false,
              errorMessage: [err.message],
              oldInput: {
                fname,
                lname,
                email,
                userType,
              },
            });
          });
      });
    }
    return res.status(422).render("auth/signup", {
      pageName: "Sign Up",
      isLoggedIn: false,
      errorMessage: errors.array().map((error) => error.msg),
      oldInput: {
        fname,
        lname,
        email,
        password,
        userType,
      },
    });
  },
];

exports.getLogoutPage = (req, res, next) => {
  // res.cookie("isLoggedIn", false);
  // console.log(req.cookies);
  // req.session.isLoggedIn = false;
  req.session.destroy();
  res.redirect("/login");
};
