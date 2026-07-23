//local module
const { getData, putData, findById } = require("../model/fileHelper");
const { getFavourite, putFavourite, getFavouriteList} = require('../model/favourite');

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
  getFavouriteList((favHomeList) => {
    res.render("user/favouritePage", { pageName: "Favourites", homes: favHomeList });
  })
};

exports.addToFavourite = (req, res, next) => {
  getFavourite((favHomes) => {
    if(favHomes.some((exist) => {return exist.id == req.body.id})){//find return object if found else undefined , some return true/false [ some(()=>{}) ]
      console.log("Home already present in favourite list");
    }else{
      favHomes.push(req.body);
      putFavourite(favHomes, () => {
        console.log("Written successfully");
      });
    }
    res.redirect("/user/favourite");// it may run before written in file
  });
};

exports.registrationPage = (req, res, next) => {
  res.render("admin/registerHomePage", { pageName: "Home Registration" });
};

exports.homeDetailsPage = (req, res, next) => {
  const homeId = req.params.homeId;// return string
  findById(homeId, (home) => {
    if(!home){
      console.log("Home not found!");
      res.redirect("/user/homeList");
    }
    res.render("user/homeDetails", { pageName: "Home Details", home: home });
  });
};
