const { getDB } = require("../utils/database");
const { getData } = require("./homesFunc");

function putFavourite(homeId) {
  const db = getDB();
  return db.collection('favourite').findOne({homeId}).then((exist) => {
    if(exist){
      return null;
    }
    return db.collection('favourite').insertOne({homeId});
  });
}

function getFavouriteList() {
  const db = getDB();
  return db.collection('favourite').find().toArray();
}

function deleteByIdFav(homeId) {
  const db = getDB();
  return db.collection('favourite').deleteOne({homeId});
}

module.exports = {
  putFavourite,
  getFavouriteList,
  deleteByIdFav,
};
