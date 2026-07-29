//local module
const {getDB} = require("../utils/database");
const {ObjectId} = require('mongodb');

function getData() {
  const db = getDB();
  return db.collection('homes').find().toArray();
}

function putData(home) {
  const db = getDB();
  const updateField = {
    houseName : home.houseName,
    price: home.price,
    location: home.location,
    rating: home.rating,
    photoUrl: home.photoUrl,
    description: home.description,
  }
  if(home._id){ // update
    return db.collection('homes').updateOne({_id: new ObjectId(String(home._id))},{$set: updateField});
  } else{ // insert
    return db.collection("homes").insertOne(home);
  }
}

function findById(homeId) {
  const db = getDB();//homeId - string(in ejs) | ObjectID(in dbms)
  return db.collection('homes').find({_id: new ObjectId(String(homeId))}).next();
}

function deleteById(homeId) {
  const db = getDB();
  return db.collection('homes').deleteOne({_id: new ObjectId(String(homeId))});
}

module.exports = { getData, putData, findById, deleteById };