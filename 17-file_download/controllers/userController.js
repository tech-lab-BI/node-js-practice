//core module
const path = require('path');
//local module
const User = require("../model/authFunc");
const { getData, findById, Home } = require("../model/homesFunc");
// const {
//   putFavourite,
//   getFavouriteList,
//   deleteByIdFav,
// } = require("../model/favouriteFunc");

exports.homePage = (req, res, next) => {
  getData().then((homes) => {
    res.render("user/userHome", {
      pageName: "Home",
      homes: homes,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.contactPage = (req, res, next) => {
  res.render("user/contactPage", {
    pageName: "Contact",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.getHomeListPage = (req, res, next) => {
  const user = req.session.user;
  console.log(user);
  // console.log(typeof user.userType);
  getData().then((homes) => {
    res.render("user/homeListPage", {
      pageName: "Home List",
      homes: homes,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.bookingPage = (req, res, next) => {
  getData().then((homes) => {
    res.render("user/bookingPage", {
      pageName: "My Booking",
      homes: homes,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.favouritePage = (req, res, next) => {
  const userId = req.session.user.userId;
  User.findById(userId).then((user) => {
    // console.log(user.favourites);
    user.populate("favourites").then((pUser) => {
      // pUser = populated user
      res.render("user/favouritePage", {
        pageName: "Favourites",
        homes: pUser.favourites,
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
      });
    });
  });
  /* getFavouriteList().then((favHomeList) => {
    getData().then((homes) => {
      const favHomes = homes.filter((home) =>
        favHomeList.some(
          (fav) => fav.homeId.toString() === home._id.toString(),
        ),
      );
      res.render("user/favouritePage", {
        pageName: "Favourites",
        homes: favHomes,
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
      });
    });
   });*/
};

exports.addToFavourite = (req, res, next) => {
  const homeId = req.body.id;
  const userId = req.session.user.userId;

  User.findById(userId)
    .then((user) => {
      if (!user.favourites.includes(homeId)) {
        user.favourites.push(homeId);
        return user.save();
      }
      console.log("already present");
      return user;
    }).then(() => res.redirect("/user/favourite"))
    .catch((err) => {
      console.log("Error in add favourite : ", err);
      res.redirect("/user/favourite");
    });
  
};

exports.homeDetailsPage = (req, res, next) => {
  const homeId = req.params.homeId; // return string
  findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found!");
      res.redirect("/user/homeList");
    }
    res.render("user/homeDetails", {
      pageName: "Home Details",
      home: home,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.download = async (req, res, next) => {
  try{
    const homeId = req.params.homeId; // return string
    const home = await Home.findById(homeId);
    if(home){
      const fileName = path.basename(home.photo);
      const filePath = path.join(__dirname, "..", "uploads", fileName);
      console.log(filePath);
      return res.download(filePath, (err) => {
        if(err)
          console.log("File download error : ",err);
      })
    } else {
      console.log("User not found");
    }
  } catch(err) {
    console.log(err);
  }
};

exports.removeFromFav = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log(homeId);
  const userId = req.session.user.userId;

  User.findById(userId)
    .then((user) => {
      user.favourites = user.favourites.filter((id) => {
        console.log(id.toString() !== homeId);
        console.log(homeId);
        return id.toString() !== homeId;
      });
      return user.save();
    })
    .catch((err) => {
      console.log("Error in remove fav : ", err);
    });
  res.redirect("/user/favourite");
  /* const homeId = req.params.homeId;
  deleteByIdFav(homeId).then(() => {
    res.redirect("/user/favourite");
  }); */
};
