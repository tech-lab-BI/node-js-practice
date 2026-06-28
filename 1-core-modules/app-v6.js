const http = require("http");
const fs = require("fs");

function requestListener(req, res) {
  console.log(req);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>
    <head>
        <title>Routing Response</title>
    </head>
    <body>
        <ul>
          <li><a href="/men">Men</a></li>
          <li><a href="/women">Women</a></li>
          <li><a href="/kids">kids</a></li>
          <li><a href="/cart">Cart</a></li>
        </ul>
    </body>
</html>`);
    return res.end();
  } else if (req.url === "/men") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>
      <head><title>Routing Request/men</title></head>
      <body><h1>Welcome to Men page</h1></body>
    </html>`);
    return res.end();
  } else if (req.url === "/women") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>
      <head><title>Routing Request/women</title></head>
      <body><h1>Welcome to Women page</h1></body>
    </html>`);
    return res.end();
  } else if (req.url === "/kids") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>
      <head><title>Routing Request/kids</title></head>
      <body><h1>Welcome to Kids page</h1></body>
    </html>`);
    return res.end();
  } else if (req.url === "/cart") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>
      <head><title>Routing Request/cart</title></head>
      <body><h1>Welcome to Cart page</h1></body>
    </html>`);
    return res.end();
  }
}

const server = http.createServer(requestListener);

server.listen(3001, () => console.log("Server start"));
