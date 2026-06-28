const http = require("http");

function requestListener(req, res) {
  console.log(req);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>
      <head><title>Routing Request/home</title></head>
      <body><h1>Welcome to Home, it show how diff response send through diff URL.</h1></body>
    </html>`);
    return res.end();
  } else if (req.url === "/path1") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>
      <head><title>Routing Request/path1</title></head>
      <body><h1>Here with another path , another response</h1></body>
    </html>`);
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write(`
  <html>
    <head><title>Routing Request/default</title></head>
    <body>
      <h1>Its default path.</h1>
      <p>Depend on url make diff response.</p>
    </body>
  </html>`);
  res.end();
}

const server = http.createServer(requestListener);

server.listen(3001, () => console.log("Server start"));
