//local module
const {putData, getData, findById, deleteById} = require('../model/fileHelper');
const {deleteByIdFav} = require('../model/favourite');

exports.adminPage = (req, res, next) => {
  getData((homes) => {
    res.render("admin/adminHome", { pageName: "Admin Panel", homes: homes});
  });
};

exports.hostHomePage = (req, res, next) => {
  getData((homes) => {
    res.render("admin/hostHomes", { pageName: "Admin Panel", homes: homes});
  });
};

exports.postHostHomePage = (req, res, next) => {
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
      res.redirect("/admin/hostHome");
    });
  });
};

exports.registrationPage = (req, res, next) => {
  res.render("admin/editHomePage", { pageName: "Home Registration", editing : false});
};

exports.editHomePage = (req, res, next) => {
  const id = req.params.homeId;
  const editing = req.query.editing; // return string
  console.log(id, editing);

  findById(id, (home) => {
    console.log(home);
    res.render("admin/editHomePage", { pageName: "Edit Home", home: home, editing : editing});
  })
};

exports.postEditHomePage = (req, res, next) => {
  getData((homes) => {
    const home = homes.find(home => home.id == req.body.id);
    home.houseName = req.body.houseName;
    home.price = req.body.price;
    home.location = req.body.location;
    home.rating = req.body.rating;
    home.photoUrl = req.body.photoUrl;
    putData(homes, () => {
      console.log("ok");
      res.redirect("/admin/hostHome");
    })
  });
};

exports.contactSubmitPage = (req, res, next) => {
  res.send(`
    <h1>Thank You for Contact We will reach you shortly........</h1>
    <a href="/">Back to Login</a>
  `);
};

exports.deleteHome = (req, res, next) => {
  deleteById(req.params.homeId, ()=> {
    deleteByIdFav(req.params.homeId, () => {
      res.redirect("/admin/hostHome");
    });
  });
}