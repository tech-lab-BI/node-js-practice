//local module
// const fs = require("fs");
// const path = require("path");
const db = require("../utils/database");

// const filePath = path.join(__dirname, "../", "data", "homes.json");

function getData() {
  return db.execute("SELECT *  FROM homes"); //return promise
}

function putData(home) {
  return db.execute(
    "INSERT INTO homes (id, houseName, price, location, rating, photoUrl, description) VALUES (?,?,?,?,?,?,?) ",
    [
      home.id,
      home.houseName,
      home.price,
      home.location,
      home.rating,
      home.photoUrl,
      home.description,
    ],
  );
}

function updateData(home) {
  return db.execute(
    "UPDATE homes SET houseName = ?, price = ?,location = ?, rating = ?, photoUrl = ? WHERE id = ?",
    [
      home.houseName,
      home.price,
      home.location,
      home.rating,
      home.photoUrl,
      home.id,
    ],
  );
}

function findById(homeId) {
  db.execute("SELECT * FROM homes WHERE id = ?", [homeId])
  .then(([home]) => {
    if(!home) console.log("Home not found !!");
  })
  return db.execute("SELECT * FROM homes WHERE id = ?", [homeId]);
}

function deleteById(homeId) {
  return db.execute("DELETE FROM homes WHERE id = ?", [homeId]);
}

module.exports = { getData, putData, updateData, findById, deleteById };
