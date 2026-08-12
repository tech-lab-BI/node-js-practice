const { default: mongoose } = require("mongoose");
const { getData, Home } = require("./homesFunc");

const favouriteSchema = new mongoose.Schema({
  homeId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const favHome = mongoose.model("Favorites", favouriteSchema);

function putFavourite(homeId) {
  return Home.findById(homeId).then((exist) => {
    if(!exist){
      return null;
    }
    return favHome.findOne({homeId});
  }).then((existInFav) => {
    if(existInFav){
      return null;
    }
    const homeFav = new favHome({homeId});
    return homeFav.save();
  })
  // const db = getDB();
  // return db.collection('favourite').findOne({homeId}).then((exist) => {
  //   if(exist){
  //     return null;
  //   }
  //   return db.collection('favourite').insertOne({homeId});
  // });
}

function getFavouriteList() {
  return favHome.find();
  // const db = getDB();
  // return db.collection('favourite').find().toArray();
}

function deleteByIdFav(homeId) {
  return favHome.deleteOne({homeId});
  // const db = getDB();
  // return db.collection('favourite').deleteOne({homeId});
}

module.exports = {
  putFavourite,
  getFavouriteList,
  deleteByIdFav,
};
