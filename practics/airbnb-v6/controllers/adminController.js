//local module
const { deleteFile } = require("../model/fileFunc");
const {
  putData,
  getData,
  findById,
  deleteById,
  Home,
} = require("../model/homesFunc");
// const { deleteByIdFav } = require("../model/favouriteFunc");

exports.adminPage = (req, res, next) => {
  getData().then((homes) => {
    res.render("admin/adminHome", {
      pageName: "Admin Panel",
      homes: homes,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.hostHomePage = (req, res, next) => {
  getData().then((homes) => {
    res.render("admin/hostHomes", {
      pageName: "Admin Panel",
      homes: homes,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.postHostHomePage = (req, res, next) => {
  // console.log(req.body);
  // console.log(req.file);
  if (!req.file) {
    return res.status(422).send("NO image selected");
  }
  const home = {
    houseName: req.body.houseName,
    price: Number(req.body.price),
    location: req.body.location,
    rating: parseFloat(req.body.rating),
    photo: `/uploads/${req.file.filename}`,
    description: req.body.description,
  };

  putData(req.body._id, home)
    .then(() => {
      res.redirect("/admin/hostHome");
    })
    .catch(console.log);
};

exports.registrationPage = (req, res, next) => {
  res.render("admin/editHomePage", {
    pageName: "Home Registration",
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
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
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.postEditHomePage = async (req, res, next) => {
  let photo = req.body.photo;
  if (req.file) {
    try {
      const home = await Home.findById(req.body.id);
      if (home) {
        await deleteFile(home.photo);
      }
    } catch (err) {
      console.log("File delete error : ", err);
    }
    photo = `/uploads/${req.file.filename}`;
  }
  console.log(req.body.photo);
  console.log(req.file);
  const home = {
    houseName: req.body.houseName,
    price: Number(req.body.price),
    location: req.body.location,
    rating: Number(req.body.rating),
    photo: photo,
    description: req.body.description,
  };

  putData(req.body.id, home)
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

exports.deleteHome = async (req, res, next) => {
  try {
    const home = await Home.findById(req.params.homeId);
    if (!home) {
      return res.status(404).send("Home not found");
    }
    if (home.photo) {
      await deleteFile(home.photo);
    }
    await deleteById(req.params.homeId);
    return res.redirect("/admin/hostHome");
  } catch (err) {
    console.log("Delete home error:", err);
  }
};
