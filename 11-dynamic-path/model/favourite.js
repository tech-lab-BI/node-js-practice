const fs = require("fs");
const path = require("path");
const { getData } = require("./fileHelper");

const favouriteDataPath = path.join(__dirname, "../", "data", "favourite.json");

function getFavourite(callback) {
  fs.readFile(favouriteDataPath, (err, data) => {
    if (err || data.length === 0) {
      console.log("Favourite list empty");
      callback([]);
      return;
    }
    callback(JSON.parse(data));
  });
}

function putFavourite(data, callback) {
  fs.writeFile(favouriteDataPath, JSON.stringify(data), (err) => {
    if (err) console.log("Error in write file");
    callback();
  });
}

function getFavouriteList(callback) {
  getFavourite((favHomesId) => {
    getData((homes) => {
      
      // const favHomeList = favHomesId.map(favHome => homes.find(home => home.id == favHome.id));

      // const favHomeList = [];
      // for(const home of homes){
      //   if(favHomesId.some(fav => fav.id == home.id)){//favHomesId.includes(home.id) favHomeId obj array , home.id value so it return always false
      //     favHomeList.push(home);
      //   }
      // }

      const favHomeList = homes.filter(home => favHomesId.some(favHome => favHome.id == home.id));

      callback(favHomeList);
    })
  });
}

module.exports = { getFavourite, putFavourite, getFavouriteList};
