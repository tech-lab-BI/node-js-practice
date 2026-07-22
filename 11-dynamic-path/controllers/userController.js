//local module
const { getData, putData, findById } = require("../model/fileHelper");

exports.homePage = (req, res, next) => {
  getData((homes) => {
    res.render("user/userHome", { pageName: "Home", homes: homes });
  });
};

exports.contactPage = (req, res, next) => {
  res.render("user/contactPage", { pageName: "Contact" });
};

exports.getHomeListPage = (req, res, next) => {
  getData((homes) => {
    res.render("user/homeListPage", { pageName: "Home List", homes: homes });
  });
};

exports.postHomeListPage = (req, res, next) => {
  getData((homes) => {
    homes.push({
      id: Math.random().toString(),
      houseName: req.body.houseName,
      price: req.body.price,
      location: req.body.location,
      rating: req.body.rating,
      photoUrl: req.body.photoUrl,
    });
    putData(homes, () => {
      res.redirect("/user/homeList");
    });
  });
};

exports.bookingPage = (req, res, next) => {
  getData((homes) => {
    res.render("user/bookingPage", { pageName: "My Booking", homes: homes });
  });
};

exports.favouritePage = (req, res, next) => {
  getData((homes) => {
    res.render("user/favouritePage", { pageName: "Favourites", homes: homes });
  });
};

exports.registrationPage = (req, res, next) => {
  res.render("admin/registerHomePage", { pageName: "Home Registration" });
};

exports.homeDetailsPage = (req, res, next) => {
  const homeId = req.params.homeId;// return string
  console.log("home id : ", homeId);
  findById(homeId, (home) => {
    if(!home){
      console.log("Home not found!");
      res.redirect("/user/homeList");
    }
    res.render("user/homeDetails", { pageName: "Home Details", home: home });
  });
};
