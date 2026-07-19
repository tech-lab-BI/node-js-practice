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

// exports.getData = getData;
// exports.putData = putData;
module.exports = {getData, putData};