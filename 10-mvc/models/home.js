//core modules
const fs = require("fs");
const path = require("path");

// const homes = [];

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }
  save() {
    Home.fetchAll((homeList) => {
      homeList.push(this); //(err) data folder change so nodemon restart homes get empty - sol>>nodemon.json
      const filePath = path.join(__dirname, "../", "data", "homes.json");
      fs.writeFile(filePath, JSON.stringify(homeList), (err) => {
        console.log(err);
      });
    });
  }
  static fetchAll(callback) {
    const filePath = path.join(__dirname, "../", "data", "homes.json");
    fs.readFile(filePath, (err, data) => {//read/wrote file async function
      //   if (err) {
      //     callback([]);
      //   }
      //   callback(JSON.parse(data));
      callback(err ? [] : JSON.parse(data));
    });
  }
};
