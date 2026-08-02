//local module
const { getData, findById } = require("../model/homesFunc");
const {
  putFavourite,
  getFavouriteList,
  deleteByIdFav,
} = require("../model/favouriteFunc");

exports.homePage = (req, res, next) => {
  getData().then((homes) => {
    res.render("user/userHome", { pageName: "Home", homes: homes });
  });
};

exports.contactPage = (req, res, next) => {
  res.render("user/contactPage", { pageName: "Contact" });
};

exports.getHomeListPage = (req, res, next) => {
  getData().then((homes) => {
    res.render("user/homeListPage", { pageName: "Home List", homes: homes });
  });
};

exports.bookingPage = (req, res, next) => {
  getData().then((homes) => {
    res.render("user/bookingPage", { pageName: "My Booking", homes: homes });
  });
};

exports.favouritePage = (req, res, next) => {
  getFavouriteList().then((favHomeList) => {
    getData().then((homes) => {
      const favHomes = homes.filter((home) => favHomeList.some((fav) => fav.homeId.toString() === home._id.toString()));
      res.render("user/favouritePage", {
        pageName: "Favourites",
        homes: favHomes,
      });
    });
  });
};

exports.addToFavourite = (req, res, next) => {
  putFavourite(req.body.id)
    .then((result) => {
      if (result) console.log("fav added success");
      else console.log("already present");
      res.redirect("/user/homeList");
    })
    .catch(console.error);
};

exports.homeDetailsPage = (req, res, next) => {
  const homeId = req.params.homeId; // return string
  findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found!");
      res.redirect("/user/homeList");
    }
    res.render("user/homeDetails", { pageName: "Home Details", home: home });
  });
};

exports.removeFromFav = (req, res, next) => {
  const homeId = req.params.homeId;
  deleteByIdFav(homeId).then(() => {
    res.redirect("/user/favourite");
  });
};
