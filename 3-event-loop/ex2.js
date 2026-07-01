const fs = require("fs"); //priority task execute first

console.log("1. Start of script");

// Microtask Queue
Promise.resolve().then(() => {
  console.log("2. Microtask 1");
});

// Timer Queue
setTimeout(() => {
  console.log("3. Timer 1");
}, 0);

// I/O Queue
fs.readFile("user-details.txt", () => {
  console.log("4. I/O operation");
});

// Check Queue
setImmediate(() => {
  console.log("5. Immediate 1");
});

// Close Queue
process.on("exit", (code) => {
  console.log("6. Exit event");
});

console.log("7. End of script");
