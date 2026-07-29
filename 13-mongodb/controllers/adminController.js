//local module
const {
  putData,
  getData,
  findById,
  deleteById,
} = require("../model/homesFunc");
const { deleteByIdFav } = require("../model/favouriteFunc");

exports.adminPage = (req, res, next) => {
  getData().then((homes) => {
    res.render("admin/adminHome", { pageName: "Admin Panel", homes: homes });
  });
};

exports.hostHomePage = (req, res, next) => {
  getData().then((homes) => {
    res.render("admin/hostHomes", { pageName: "Admin Panel", homes: homes });
  });
};

exports.postHostHomePage = (req, res, next) => {
  console.log(req.body);
  const home = {
    // _id: req.body.id, //let mongodb auto genarate
    houseName: req.body.houseName,
    price: Number(req.body.price),
    location: req.body.location,
    rating: parseFloat(req.body.rating),
    photoUrl: req.body.photoUrl,
    description: req.body.description,
  };

  putData(home)
    .then((result) => {
      res.redirect("/admin/hostHome");
    })
    .catch(console.log);
};

exports.registrationPage = (req, res, next) => {
  res.render("admin/editHomePage", {
    pageName: "Home Registration",
    editing: false,
  });
};

exports.editHomePage = (req, res, next) => {
  const _id = req.params.homeId;
  const editing = req.query.editing; // return string

  findById(_id).then((home) => {
    res.render("admin/editHomePage", {
      pageName: "Edit Home",
      home: home,
      editing: editing,
    });
  });
};

exports.postEditHomePage = (req, res, next) => {
  const home = {
    _id: req.body.id,
    houseName: req.body.houseName,
    price: Number(req.body.price),
    location: req.body.location,
    rating: Number(req.body.rating),
    photoUrl: req.body.photoUrl,
    description: null,
  };

  putData(home)
    .then(() => {
      res.redirect("/admin/hostHome");
    })
    .catch(console.log);
};

exports.contactSubmitPage = (req, res, next) => {
  res.send(`
    <h1>Thank You for Contact We will reach you shortly........</h1>
    <a href="/">Back to Login</a>
  `);
};

exports.deleteHome = (req, res, next) => {
  deleteById(req.params.homeId).then(() => {
    // deleteByIdFav(req.params.homeId, () => {
    res.redirect("/admin/hostHome");
    // });
  });
};
