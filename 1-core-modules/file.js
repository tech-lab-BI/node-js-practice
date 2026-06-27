const fs = require("fs");
fs.writeFile("abc.txt", "hello world", (e) => {
  if (e) console.log("Error occured");
  else console.log("Check file");
});
