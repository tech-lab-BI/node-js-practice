const fs = require("fs");

console.log("1. Start of script.");

console.log("2. Reading file synchronously.");
fs.writeFileSync("text.txt", "File written synchronously.");
console.log("3. Synchronus read complete.");

console.log("4. Reading file asynchronusly.");
fs.writeFile("abc.txt", "File written asynchronusly.", (err) => {
  if (err) console.log("Some error occured.");
  console.log("6. Asynchronous write complete.");
});

console.log("5. End of Script.");
