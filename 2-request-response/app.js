const http = require("http");
const requestHandler = require("./customModule");

const server = http.createServer(requestHandler);

server.listen(3001, () => {
  console.log("SERVER RUNNING.......");
});
