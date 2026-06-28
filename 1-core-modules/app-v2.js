const http = require("http");

function requestListener(req, res) {
  console.log(req);
  res.setHeader("Content-Type", "text/html");
  res.write(`<html>
      <head><title>Hello world</title></head>
      <body><h1>Hello world... Learning nodeJS</h1></body>
    </html>`);
  res.end();
  // process.exit();//stop server
}

const server = http.createServer(requestListener);

server.listen(3001, () => console.log("Server start"));
