const http = require("http");
const requestHandler = require("./calculatorModule");

const server = http.createServer(requestHandler);

server.listen(3001, () => {
  console.log("SERVER RUNNING......");
});