const http = require("http"); //Import Node.js built-in HTTP module
const requestHandler = require("./calculatorModule"); // Import custom module

const server = http.createServer(requestHandler); // Create HTTP server and register requestHandler as callback

server.listen(3001, () => {
  // Start server and listen for incoming requests on port 3001
  console.log("SERVER RUNNING......");
});
