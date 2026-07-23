const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../", "data", "homes.json");

function getData(callback) {
  fs.readFile(filePath, (err, data) => {
    if(err || data.length === 0) return callback([]);
    callback(JSON.parse(data));
  });
}

function putData(homes, callback) {
  fs.writeFile(filePath, JSON.stringify(homes), (err) => {
    if (err) console.log(err);
    callback();
  });
}

function findById(homeId, callback){
  getData((homes) => {
    const home = homes.find((home) => home.id === homeId);// syntax - find(()=>{}) return obj if found else undefined
    console.log("fileHelper / home : ",home);
    callback(home);
  })
}

// exports.getData = getData;
// exports.putData = putData;
module.exports = {getData, putData, findById};