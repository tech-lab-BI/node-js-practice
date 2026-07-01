const http = require("http"); // 1. Import Node.js built-in HTTP module
const requestHandler = require("./calculatorModule"); // 2. Import custom module

const server = http.createServer(requestHandler); // 3. Create HTTP server and register requestHandler as callback

server.listen(3001, () => {
  // 4. Start server and listen for incoming requests on port 3001
  console.log("SERVER RUNNING......");
});
